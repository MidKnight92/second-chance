import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Container,
    CardDeck,
    Row,
    Col
} from 'reactstrap'

// Component Description (Public):
// This shows all the dogs currently in shelters the results will be fetched from the PetFinder API
class ShelterIndex extends Component {
    constructor() {
        super();
        this.state = {
            dogs: null
        }
    }
    componentDidMount() {
        this.getDogs();
    }
    getDogs = async (req, res) => {
        try {
            const dogs = await fetch(process.env.REACT_APP_API_URL + '/dogs/shelter', {
                credentials: 'include',
                method: "GET"
            });
            const parsedDogs = await dogs.json();
            console.log(parsedDogs.animals);
            this.setState({
                dogs: parsedDogs.animals
            })
        } catch (err) {
            console.log(err)
        }
    }
    render() {
    	let dogs
    	// console.log("this.state.dogs", Boolean(this.state.dogs));
    	{this.state.dogs 
    		?
		    dogs = this.state.dogs.map((dog) => {
		    	return(
						<CardDeck key={dog.id} className="no-gutters">
							<Card body outline color="secondary" className="mb-4" >
							<CardBody style={{textAlign: "justify"}}>
							<div className="col-md-6">
							<CardImg top width="100%" className="rounded" src={dog.photos.medium} alt="Cute Puppy"/>
							</div>
								<CardTitle style={{textTransform: "uppercase", fontWeight: "bolder", textDecoration: "underline"}}>{dog.name}</CardTitle>
								<CardSubtitle>{dog.breeds.primary}</CardSubtitle>
								<CardText>{dog.description}</CardText>
								<Button color="primary">Info</Button>
							</CardBody>
							</Card>
						</CardDeck>
		    	)
		    })
		    :
		    dogs = null
    	}
        return (
	        <Container>
				<h3>Shelter Dogs</h3>
				<h6>These Dogs are currently in shelters near you and they are looking for their forever home.</h6>
				<br/>
				{ dogs }
			</Container>
        )
    }

}

export default ShelterIndex;