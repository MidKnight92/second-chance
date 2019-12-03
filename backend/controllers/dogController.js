const express = require('express')
const router = express.Router()
const fetch = require('node-fetch');
// const Buffer = require('buffer/').Buffer
const Dog = require('../models/dog.js')
const User = require('../models/user.js')

//@route GET /dogs/
//@description GET TOKEN from PetFinder API 
//@access public 
router.get('/', async (req,res,next) => {
	console.log("I'm hitting the route");
	const url = "https://api.petfinder.com/v2/oauth2/token";
	const response = await fetch (url, {
	  body: `grant_type=client_credentials&client_id=${process.env.API_KEY}&client_secret=${process.env.SECRET}`, 
	  headers: {
	    "Content-Type": "application/x-www-form-urlencoded"
	  },
	  method: "POST"
	})
	
	const json = await response.json();
	res.send(json['access_token']);

})



//@route GET /dogs/shelter
//@description Shelter Dogs Index - using PetFinder API
//@access public
router.get('/shelter', async (req, res, next) => {
	console.log("I'm hitting the shelter route.");
	const url  = 'https://api.petfinder.com/v2/animals?type=dog&color=black'; 
	const response = await fetch (url, {
		headers: {
			authorization: `${process.env.TOKEN_TYPE} ${process.env.ACCESS_TOKEN}`
		},
		method: "GET"
	})
	const json = await response.json();
	res.send(json)
})

//@route GET /dogs/shelter/:id
//@description Shelter Dog Show Page - using PetFinder API
//@access public
// GET https://api.petfinder.com/v2/animals/{id}
router.get('/shelter/:id', async (req, res, next) => {
	console.log("I'm hitting the shelter id route.");
	const url  = `https://api.petfinder.com/v2/animals/${req.params.id}`; 
	const response = await fetch (url, {
		headers: {
			authorization: `${process.env.TOKEN_TYPE} ${process.env.ACCESS_TOKEN}`
		},
		method: "GET"
	})
	const json = await response.json();
	res.send(json)
})



//@route GET /dogs/rehome
//@description Home to Rehome Dogs Index
//@access public

//@route GET /dogs/rehome/:id
//@description Home to Rehome Dog Show Page
//@access public

// Middleware - All routes below will now require Auth
const requireAuth = (req, res, next) => {
	if (!req.session.loggedIn) {
		req.session.message = 'You must be logged in to do that'
		res.json('User must log in - Auth is required')
	} else {
		next()
	}
}
// All routes below will now requireAuth
router.use(requireAuth)

//@route GET /dogs/new
//@description User Looking to Rehome their dog Routes - This route will show a form of dog criteria for the user to fill out in order to create a profile for their dog to be inserted into the rehoming section
// router.get('/new', (req, res) => {
// 	res.json('new')
// })

//@route POST /dogs
//@description User Looking to adopt dog, the form
//@access restricted
router.post('/adopt', async (req, res, next) => {
	console.log(req.session);
	try {
		if (req.body.good_with_children === 'on') {
			req.body.good_with_children = true;
		} else {
			req.body.good_with_children = false;
		}
		if (req.body.good_with_dogs === 'on') {
			req.body.good_with_dogs = true;
		} else {
			req.body.good_with_dogs = false;
		}
		if (req.body.good_with_cats === 'on') {
			req.body.good_with_cats = true;
		} else {
			req.body.good_with_cats = false;
		}
		if (req.body.adopted === 'on') {
			req.body.adopted = true;
		} else {
			req.body.adopted = false;
		}
		if (req.session.loggedIn === true){
			const dog = {
				breed: req.body.breed,
				size: req.body.size,
				age: req.body.age,
				coat: req.body.coat,
				good_with_children: req.body.good_with_children,
				good_with_dogs: req.body.good_with_dogs,
				good_with_cats: req.body.good_with_cats,
			}
			const savedDogs = await Dog.find(dog)
			res.json(savedDogs)
			// res.redirect('/dogs/:id')
		} else {
			req.session.logOutMsg = 'You need to create an account';
			res.json('Not authorized to do that')
			// res.redirect('/users/login')
		}
	}

	catch (err) {
		res.status(400).json('Error' + err)
		next(err)
	}
})


//@route POST /dogs
//@description User Looking to Rehome their dog Routes - This route will show a form of dog criteria for the user to fill out in order to create a profile for their dog to be inserted into the rehoming section
//@access restricted
router.post('/new', async (req, res, next) => {
	console.log(req.session);
	try {
		if (req.body.good_with_children === 'on') {
			req.body.good_with_children = true;
		} else {
			req.body.good_with_children = false;
		}
		if (req.body.good_with_dogs === 'on') {
			req.body.good_with_dogs = true;
		} else {
			req.body.good_with_dogs = false;
		}
		if (req.body.good_with_cats === 'on') {
			req.body.good_with_cats = true;
		} else {
			req.body.good_with_cats = false;
		}
		if (req.body.adopted === 'on') {
			req.body.adopted = true;
		} else {
			req.body.adopted = false;
		}
		if (req.session.loggedIn === true){
			const dog = {
				user: req.session.userId,
				name: req.body.name,
				breed: req.body.breed,
				adopted: req.body.adopted,
				size: req.body.size,
				age: req.body.age,
				coat: req.body.coat,
				good_with_children: req.body.good_with_children,
				good_with_dogs: req.body.good_with_dogs,
				good_with_cats: req.body.good_with_cats,
				image: req.body.image
			}
			const savedDog = await Dog.create(dog)
			res.json(savedDog)
			// res.redirect('/dogs/:id')
		} else {
			req.session.logOutMsg = 'You need to create an account';
			res.json('Not authorized to do that')
			// res.redirect('/users/login')
		}
	}

	catch (err) {
		res.status(400).json('Error' + err)
		next(err)
	}
})

//@route GET /dogs/:id
//@description This route will allow Users to see their dogs’ profile page
router.get('/:id', async (req, res, next) => {
	console.log('Hitting get/dogs/:id route');
	try {
		const dogs = await Dog.find({user: req.session.userId});
		res.json({
			dog: dogs,
			userId: req.session.userId
		})
	}
	catch (err) {
		res.status(400).json('Error' + err)
		next(err)
	}
})

//@route GET /dogs/:id/edit
//@description This route will allow Users to edit their dogs’ profile page -- require auth’d user to be that dogs owner
router.get('/:id/edit', async (req, res, next) => {
	try {
		const oneDog = await Dog.findById(req.params.id);
		res.json({
			dog: oneDog
		})
	}
	catch (err) {
		res.status(400).json('Error' + err)		
		next(err)
	}
})

//@route PUT /dogs/:id
//@description This route will allow Users to edit their dogs’ profile page -- require auth’d user to be that dogs owner
//@access restricted
router.put('/:id', async (req, res, next) => {
	try {
		const updatedDogInfo = {
			user: req.session.userId,
			name: req.body.name,
			breed: req.body.breed,
			adopted: req.body.adopted,
			size: req.body.size,
			age: req.body.age,
			coat: req.body.coat,
			good_with_children: req.body.good_with_children,
			good_with_dogs: req.body.good_with_dogs,
			good_with_cats: req.body.good_with_cats,
			image: req.body.image
		}
		const dog = await Dog.findByIdAndUpdate(req.params.id, updatedDogInfo)
			// res.redirect('/dogs/:id')
			res.json('Dog updated')
	}
	catch (err) {
		res.status(400).json('Error' + err)
		next(err)
	}
})







module.exports = router