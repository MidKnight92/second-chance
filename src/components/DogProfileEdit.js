import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, FormText, Label, Input, Container } from 'reactstrap';


class DogProfileEdit extends Component {
    constructor(props) {
        super(props);
        const info = props.location.state
        // console.log(info)
        this.state = {
            dog: info._id,
            user: info.user,
            name: info.name,
            breed: info.breed,
            description: info.description,
            adopted: info.adopted,
            size: info.size,
            age: info.age,
            coat: info.coat,
            good_with_children: 'off',
            good_with_dogs: 'off',
            good_with_cats: 'off',
            image: ''
        }
    }
    deleteDog = async (e, id) => {
    	// console.log('this is in the deleteDog--- this.state.dog-->', this.state.dog)
    	// console.log('you hit the deleteDog!!!!')
     //    console.log('THIS IS E ----->>>>', e)
        try {
            const deleteDogResponse = await fetch(process.env.REACT_APP_BACKEND_URL + `/dogs/${this.state.dog}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            // This is the parsed response from dog
            const deleteDogParsed = await deleteDogResponse.json();
            // console.log('this is the dog',deleteDogParsed)

            if (deleteDogParsed.status === 200) {
                // console.log('IN----- DogProfileEdit.js --------');
                this.props.history.push('/')
             }
        } catch (err) {
            console.log(err)
        }

    }
    handleEditChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        // console.log('THIS IS STATE I handleEditChange', this.state)
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/dogs/${this.state.dog}`

            const updateResponse = await fetch(url, {
                method: "PUT",
                credentials: 'include',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const updatedResponseParsed = await updateResponse.json()
            // console.log("THIS IS MY RESPONSE FROM THE DB after ")
            // console.log(updatedResponseParsed);

            this.setState({
                dog: updatedResponseParsed._id,
                user: updatedResponseParsed.user,
                name: updatedResponseParsed.name,
                breed: updatedResponseParsed.breed,
                description: updatedResponseParsed.description,
                adopted: updatedResponseParsed.adopted,
                size: updatedResponseParsed.size,
                age: updatedResponseParsed.age,
                coat: updatedResponseParsed.coat,
                good_with_children: 'off',
                good_with_dogs: 'off',
                good_with_cats: 'off',
                image: updatedResponseParsed.image
            })

            if (updatedResponseParsed.status === 200 && !updatedResponseParsed.adopted) {
                // console.log('IN----- DogProfileEdit.js --------');
                this.props.history.push(`/dogs/${updatedResponseParsed.dog._id}`, updatedResponseParsed.dog)
             } //else if (updatedResponseParsed.status === 200 && updatedResponseParsed.adopted) {
            //     // Delete the dog from db and forward them to the homepage.
            //     // {this.deleteDog()};
            //     // () => props.history.goBack('/dogs/adopt')
            // }
        } catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <Form style={{marginBottom: '10%'}} onSubmit={this.handleSubmit}>
			<Container>
				<h1>Update Your Dog's Profile</h1>
				<FormGroup row>
					<Label sm={2}>Name:</Label>
					<Col sm={10}>
          			<Input type="text" name="name" placeholder="Fido" onChange={this.handleEditChange}>
          			</Input>
        			</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Breed:</Label>
					<Col sm={10}>
          			<Input type="select" name="breed" value={this.state.value} onChange={this.handleEditChange}>
          				<option value="Affenpinscher">Affenpinscher</option>
						<option value="Afghan Hound">Afghan Hound</option>
						<option value="Airedale Terrier">Airedale Terrier</option>
						<option value="Akbash">Akbash</option>
						<option value="Akita">Akita</option>
						<option value="Alaskan Malamute">Alaskan Malamute</option>
						<option value="American Bulldog">American Bulldog</option>
						<option value="American Eskimo Dog">American Eskimo Dog</option>
						<option value="American Foxhound">American Foxhound</option>
						<option value="American Hairless Terrier">American Hairless Terrier</option>
						<option value="American Staffordshire Terrier">American Staffordshire Terrier</option>
						<option value="American Water Spaniel">American Water Spaniel</option>
						<option value="Anatolian Shepherd">Anatolian Shepherd</option>
						<option value="Appenzell Mountain Dog">Appenzell Mountain Dog</option>
						<option value="Australian Cattle Dog / Blue Heeler">Australian Cattle Dog / Blue Heeler</option>
						<option value="Australian Kelpie">Australian Kelpie</option>
						<option value="Australian Shepherd">Australian Shepherd</option>
						<option value="Australian Terrier">Australian Terrier</option>
						<option value="Basenji">Basenji</option>
						<option value="Basset Hound">Basset Hound</option>
						<option value="Beagle">Beagle</option>
						<option value="Bearded Collie">Bearded Collie</option>
						<option value="Beauceron">Beauceron</option>
						<option value="Bedlington Terrier">Bedlington Terrier</option>
						<option value="Belgian Shepherd / Laekenois">Belgian Shepherd / Laekenois</option>
						<option value="Belgian Shepherd / Malinois">Belgian Shepherd / Malinois</option>
						<option value="Belgian Shepherd / Sheepdog">Belgian Shepherd / Sheepdog</option>
						<option value="Belgian Shepherd / Tervuren">Belgian Shepherd / Tervuren</option>
						<option value="Bernese Mountain Dog">Bernese Mountain Dog</option>
						<option value="Bichon Frise">Bichon Frise</option>
						<option value="Black and Tan Coonhound">Black and Tan Coonhound</option>
						<option value="Black Labrador Retriever">Black Labrador Retriever</option>
						<option value="Black Mouth Cur">Black Mouth Cur</option>
						<option value="Black Russian Terrier">Black Russian Terrier</option>
						<option value="Bloodhound">Bloodhound</option>
						<option value="Blue Lacy">Blue Lacy</option>
						<option value="Bluetick Coonhound">Bluetick Coonhound</option>
						<option value="Boerboel">Boerboel</option>
						<option value="Bolognese">Bolognese</option>
						<option value="Border Collie">Border Collie</option>
						<option value="Border Terrier">Border Terrier</option>
						<option value="Borzoi">Borzoi</option>
						<option value="Boston Terrier">Boston Terrier</option>
						<option value="Bouvier des Flandres">Bouvier des Flandres</option>
						<option value="Boxer">Boxer</option>
						<option value="Boykin Spaniel">Boykin Spaniel</option>
						<option value="Briard">Briard</option>
						<option value="Brittany Spaniel">Brittany Spaniel</option>
						<option value="Brussels Griffon">Brussels Griffon</option>
						<option value="Bull Terrier">Bull Terrier</option>
						<option value="Bullmastiff">Bullmastiff</option>
						<option value="Cairn Terrier">Cairn Terrier</option>
						<option value="Canaan Dog">Canaan Dog</option>
						<option value="Cane Corso">Cane Corso</option>
						<option value="Cardigan Welsh Corgi">Cardigan Welsh Corgi</option>
						<option value="Carolina Dog">Carolina Dog</option>
						<option value="Catahoula Leopard Dog">Catahoula Leopard Dog</option>
						<option value="Cattle Dog">Cattle Dog</option>
						<option value="Caucasian Sheepdog / Caucasian Ovtcharka">Caucasian Sheepdog / Caucasian Ovtcharka</option>
						<option value="Cavalier King Charles Spaniel">Cavalier King Charles Spaniel</option>
						<option value="Chesapeake Bay Retriever">Chesapeake Bay Retriever</option>
						<option value="Chihuahua">Chihuahua</option>
						<option value="Chinese Crested Dog">Chinese Crested Dog</option>
						<option value="Chinese Foo Dog">Chinese Foo Dog</option>
						<option value="Chinook">Chinook</option>
						<option value="Chocolate Labrador Retriever">Chocolate Labrador Retriever</option>
						<option value="Chow Chow">Chow Chow</option>
						<option value="Cirneco dell'Etna">Cirneco dell'Etna</option>
						<option value="Clumber Spaniel">Clumber Spaniel</option>
						<option value="Cockapoo">Cockapoo</option>
						<option value="Cocker Spaniel">Cocker Spaniel</option>
						<option value="Collie">Collie</option>
						<option value="Coonhound">Coonhound</option>
						<option value="Corgi">Corgi</option>
						<option value="Coton de Tulear">Coton de Tulear</option>
						<option value="Curly-Coated Retriever">Curly-Coated Retriever</option>
						<option value="Dachshund">Dachshund</option>
						<option value="Dalmatian">Dalmatian</option>
						<option value="Dandie Dinmont Terrier">Dandie Dinmont Terrier</option>
						<option value="Doberman Pinscher">Doberman Pinscher</option>
						<option value="Dogo Argentino">Dogo Argentino</option>
						<option value="Dogue de Bordeaux">Dogue de Bordeaux</option>
						<option value="Dutch Shepherd">Dutch Shepherd</option>
						<option value="English Bulldog">English Bulldog</option>
						<option value="English Cocker Spaniel">English Cocker Spaniel</option>
						<option value="English Coonhound">English Coonhound</option>
						<option value="English Foxhound">English Foxhound</option>
						<option value="English Pointer">English Pointer</option>
						<option value="English Setter">English Setter</option>
						<option value="English Shepherd">English Shepherd</option>
						<option value="English Springer Spaniel">English Springer Spaniel</option>
						<option value="English Toy Spaniel">English Toy Spaniel</option>
						<option value="Entlebucher">Entlebucher</option>
						<option value="Eskimo Dog">Eskimo Dog</option>
						<option value="Feist">Feist</option>
						<option value="Field Spaniel">Field Spaniel</option>
						<option value="Fila Brasileiro">Fila Brasileiro</option>
						<option value="Finnish Lapphund">Finnish Lapphund</option>
						<option value="Finnish Spitz">Finnish Spitz</option>
						<option value="Flat-Coated Retriever">Flat-Coated Retriever</option>
						<option value="Fox Terrier">Fox Terrier</option>
						<option value="Foxhound">Foxhound</option>
						<option value="French Bulldog">French Bulldog</option>
						<option value="Galgo Spanish Greyhound">Galgo Spanish Greyhound</option>
						<option value="German Pinscher">German Pinscher</option>
						<option value="German Shepherd Dog">German Shepherd Dog</option>
						<option value="German Shorthaired Pointer">German Shorthaired Pointer</option>
						<option value="German Spitz">German Spitz</option>
						<option value="German Wirehaired Pointer">German Wirehaired Pointer</option>
						<option value="Giant Schnauzer">Giant Schnauzer</option>
						<option value="Glen of Imaal Terrier">Glen of Imaal Terrier</option>
						<option value="Golden Retriever">Golden Retriever</option>
						<option value="Gordon Setter">Gordon Setter</option>
						<option value="Great Dane">Great Dane</option>
						<option value="Great Pyrenees">Great Pyrenees</option>
						<option value="Greater Swiss Mountain Dog">Greater Swiss Mountain Dog</option>
						<option value="Greyhound">Greyhound</option>
						<option value="Hamiltonstovare">Hamiltonstovare</option>
						<option value="Harrier">Harrier</option>
						<option value="Havanese">Havanese</option>
						<option value="Hound">Hound</option>
						<option value="Hovawart">Hovawart</option>
						<option value="Husky">Husky</option>
						<option value="Ibizan Hound">Ibizan Hound</option>
						<option value="Icelandic Sheepdog">Icelandic Sheepdog</option>
						<option value="Illyrian Sheepdog">Illyrian Sheepdog</option>
						<option value="Irish Setter">Irish Setter</option>
						<option value="Irish Terrier">Irish Terrier</option>
						<option value="Irish Water Spaniel">Irish Water Spaniel</option>
						<option value="Irish Wolfhound">Irish Wolfhound</option>
						<option value="Italian Greyhound">Italian Greyhound</option>
						<option value="Jack Russell Terrier">Jack Russell Terrier</option>
						<option value="Japanese Chin">Japanese Chin</option>
						<option value="Jindo">Jindo</option>
						<option value="Kai Dog">Kai Dog</option>
						<option value="Karelian Bear Dog">Karelian Bear Dog</option>
						<option value="Keeshond">Keeshond</option>
						<option value="Kerry Blue Terrier">Kerry Blue Terrier</option>
						<option value="Kishu">Kishu</option>
						<option value="Klee Kai">Klee Kai</option>
						<option value="Komondor">Komondor</option>
						<option value="Kuvasz">Kuvasz</option>
						<option value="Kyi Leo">Kyi Leo</option>
						<option value="Labrador Retriever">Labrador Retriever</option>
						<option value="Lakeland Terrier">Lakeland Terrier</option>
						<option value="Lancashire Heeler">Lancashire Heeler</option>
						<option value="Leonberger">Leonberger</option>
						<option value="Lhasa Apso">Lhasa Apso</option>
						<option value="Lowchen">Lowchen</option>
						<option value="Maltese">Maltese</option>
						<option value="Manchester Terrier">Manchester Terrier</option>
						<option value="Maremma Sheepdog">Maremma Sheepdog</option>
						<option value="Mastiff">Mastiff</option>
						<option value="McNab">McNab</option>
						<option value="Miniature Bull Terrier">Miniature Bull Terrier</option>
						<option value="Miniature Dachshund">Miniature Dachshund</option>
						<option value="Miniature Pinscher">Miniature Pinscher</option>
						<option value="Miniature Poodle">Miniature Poodle</option>
						<option value="Miniature Schnauzer">Miniature Schnauzer</option>
						<option value="Mixed Breed">Mixed Breed</option>
						<option value="Mountain Cur">Mountain Cur</option>
						<option value="Mountain Dog">Mountain Dog</option>
						<option value="Munsterlander">Munsterlander</option>
						<option value="Neapolitan Mastiff">Neapolitan Mastiff</option>
						<option value="New Guinea Singing Dog">New Guinea Singing Dog</option>
						<option value="Newfoundland Dog">Newfoundland Dog</option>
						<option value="Norfolk Terrier">Norfolk Terrier</option>
						<option value="Norwegian Buhund">Norwegian Buhund</option>
						<option value="Norwegian Elkhound">Norwegian Elkhound</option>
						<option value="Norwegian Lundehund">Norwegian Lundehund</option>
						<option value="Norwich Terrier">Norwich Terrier</option>
						<option value="Nova Scotia Duck Tolling Retriever">Nova Scotia Duck Tolling Retriever</option>
						<option value="Old English Sheepdog">Old English Sheepdog</option>
						<option value="Otterhound">Otterhound</option>
						<option value="Papillon">Papillon</option>
						<option value="Parson Russell Terrier">Parson Russell Terrier</option>
						<option value="Patterdale Terrier / Fell Terrier">Patterdale Terrier / Fell Terrier</option>
						<option value="Pekingese">Pekingese</option>
						<option value="Pembroke Welsh Corgi">Pembroke Welsh Corgi</option>
						<option value="Peruvian Inca Orchid">Peruvian Inca Orchid</option>
						<option value="Petit Basset Griffon Vendeen">Petit Basset Griffon Vendeen</option>
						<option value="Pharaoh Hound">Pharaoh Hound</option>
						<option value="Pit Bull Terrier">Pit Bull Terrier</option>
						<option value="Plott Hound">Plott Hound</option>
						<option value="Pointer">Pointer</option>
						<option value="Polish Lowland Sheepdog">Polish Lowland Sheepdog</option>
						<option value="Pomeranian">Pomeranian</option>
						<option value="Poodle">Poodle</option>
						<option value="Portuguese Podengo">Portuguese Podengo</option>
						<option value="Portuguese Water Dog">Portuguese Water Dog</option>
						<option value="Presa Canario">Presa Canario</option>
						<option value="Pug">Pug</option>
						<option value="Puli">Puli</option>
						<option value="Pumi">Pumi</option>
						<option value="Pyrenean Shepherd">Pyrenean Shepherd</option>
						<option value="Rat Terrier">Rat Terrier</option>
						<option value="Redbone Coonhound">Redbone Coonhound</option>
						<option value="Retriever">Retriever</option>
						<option value="Rhodesian Ridgeback">Rhodesian Ridgeback</option>
						<option value="Rottweiler">Rottweiler</option>
						<option value="Rough Collie">Rough Collie</option>
						<option value="Saint Bernard">Saint Bernard</option>
						<option value="Saluki">Saluki</option>
						<option value="Samoyed">Samoyed</option>
						<option value="Sarplaninac">Sarplaninac</option>
						<option value="Schipperke">Schipperke</option>
						<option value="Schnauzer">Schnauzer</option>
						<option value="Scottish Deerhound">Scottish Deerhound</option>
						<option value="Scottish Terrier">Scottish Terrier</option>
						<option value="Sealyham Terrier">Sealyham Terrier</option>
						<option value="Setter">Setter</option>
						<option value="Shar-Pei">Shar-Pei</option>
						<option value="Sheep Dog">Sheep Dog</option>
						<option value="Shepherd">Shepherd</option>
						<option value="Shetland Sheepdog / Sheltie">Shetland Sheepdog / Sheltie</option>
						<option value="Shiba Inu">Shiba Inu</option>
						<option value="Shih Tzu">Shih Tzu</option>
						<option value="Siberian Husky">Siberian Husky</option>
						<option value="Silky Terrier">Silky Terrier</option>
						<option value="Skye Terrier">Skye Terrier</option>
						<option value="Sloughi">Sloughi</option>
						<option value="Smooth Collie">Smooth Collie</option>
						<option value="Smooth Fox Terrier">Smooth Fox Terrier</option>
						<option value="South Russian Ovtcharka">South Russian Ovtcharka</option>
						<option value="Spaniel">Spaniel</option>
						<option value="Spanish Water Dog">Spanish Water Dog</option>
						<option value="Spinone Italiano">Spinone Italiano</option>
						<option value="Spitz">Spitz</option>
						<option value="Staffordshire Bull Terrier">Staffordshire Bull Terrier</option>
						<option value="Standard Poodle">Standard Poodle</option>
						<option value="Standard Schnauzer">Standard Schnauzer</option>
						<option value="Sussex Spaniel">Sussex Spaniel</option>
						<option value="Swedish Vallhund">Swedish Vallhund</option>
						<option value="Terrier">Terrier</option>
						<option value="Thai Ridgeback">Thai Ridgeback</option>
						<option value="Tibetan Mastiff">Tibetan Mastiff</option>
						<option value="Tibetan Spaniel">Tibetan Spaniel</option>
						<option value="Tibetan Terrier">Tibetan Terrier</option>
						<option value="Tosa Inu">Tosa Inu</option>
						<option value="Toy Fox Terrier">Toy Fox Terrier</option>
						<option value="Toy Manchester Terrier">Toy Manchester Terrier</option>
						<option value="Treeing Walker Coonhound">Treeing Walker Coonhound</option>
						<option value="Vizsla">Vizsla</option>
						<option value="Weimaraner">Weimaraner</option>
						<option value="Welsh Springer Spaniel">Welsh Springer Spaniel</option>
						<option value="Welsh Terrier">Welsh Terrier</option>
						<option value="West Highland White Terrier / Westie">West Highland White Terrier / Westie</option>
						<option value="Wheaten Terrier">Wheaten Terrier</option>
						<option value="Whippet">Whippet</option>
						<option value="White German Shepherd">White German Shepherd</option>
						<option value="Wire Fox Terrier">Wire Fox Terrier</option>
						<option value="Wirehaired Dachshund">Wirehaired Dachshund</option>
						<option value="Wirehaired Pointing Griffon">Wirehaired Pointing Griffon</option>
						<option value="Wirehaired Terrier">Wirehaired Terrier</option>
						<option value="Xoloitzcuintli / Mexican Hairless">Xoloitzcuintli / Mexican Hairless</option>
						<option value="Yellow Labrador Retriever">Yellow Labrador Retriever</option>
						<option value="Yorkshire Terrier">Yorkshire Terrier</option>
          			</Input>
        			</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Size:</Label>
					<Col sm={10}>
          			<Input type="select" name="size" value={this.state.value} onChange={this.handleEditChange}>
          			<option value="small">Small</option>
          			<option value="medium">Medium</option>
          			<option value="large">Large</option>
          			<option value="xlarge">Extra Large</option>
          			</Input>
        			</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Age:</Label>
					<Col sm={10}>
          			<Input type="select" name="age" value={this.state.value} onChange={this.handleEditChange}>
          			<option value="baby">Baby</option>
          			<option value="young">Young</option>
          			<option value="adult">Adult</option>
          			<option value="senior">Senior</option>
          			</Input>
        			</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Coat:</Label>
					<Col sm={10}>
          			<Input type="select" name="coat" value={this.state.value} onChange={this.handleEditChange}>
          			<option value="short">Short</option>
          			<option value="medium">Medium</option>
          			<option value="long">Long</option>
          			<option value="wire">Wire</option>
          			<option value="hairless">Hairless</option>
          			</Input>
        			</Col>
				</FormGroup>
				<FormGroup row>
					<Label type="textarea" name="description">Description:</Label>
					<Col sm={10}>
						<Input style={{marginLeft: '11%'}} type="textarea" name="description" placeholder="Fido is warm and loving..." onChange={this.handleEditChange}/>
					</Col>
				</FormGroup>
				<FormGroup>
			        <Label for="file">Upload an image of your dog.</Label>
			        <Col sm={10}>
			        	<Input type="file" encType="multipart/form-data" name="image" onChange={this.handleEditChange}/>
			        	<FormText color="muted">
			          Input file (jpg, jpeg, png, or gif)
			        </FormText>
			        </Col>
			    </FormGroup>
				<FormGroup tag="fieldset" row check>
    			<legend className="col-form-label">What type of living environment will your dog thrive in? {<br/>} (Click the boxes that describe your dog)</legend>
    			<Col sm={10}>
    				<Label check>
    					<Input type="checkbox" name="good_with_children" value="on" onChange={this.handleEditChange}/>{' '}
    					Children - your dog is great with children.
    				</Label>
    			</Col>	
    			</FormGroup>
    			<FormGroup tag="fieldset" row check>
    			<Col sm={10}>
    				<Label check>
    					{' '}<Input type="checkbox" name="good_with_dogs" value="on" onChange={this.handleEditChange}/>
    					Dogs - your dog is great with other dogs.
    				</Label>
    			</Col>	
    			</FormGroup>	
    			<FormGroup tag="fieldset" row check>
    			<Col sm={10}>
    				<Label check>
    					<Input type="checkbox" name="good_with_cats" value="on" onChange={this.handleEditChange}/>{' '}
    					Cats - your dog is great with cats.
    				</Label>
    			</Col>	
    			</FormGroup>
    			<Col sm={{ size: 3 }}>
                  <Button color="primary" style={{marginTop: "5%", marginRight: "30%"}}>Submit</Button>
                  <Button color="success" onClick={this.deleteDog} style={{marginTop: "5%", }}>Adopted</Button>
                </Col>
			</Container>		
		</Form>
        )
    }

}

export default DogProfileEdit;