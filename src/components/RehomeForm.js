import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, FormText, Label, Input, Container } from 'reactstrap';
import breed from '../breed';

// Component Description (Private):
// This is a Form Page that shows only if the users results return false for adopting - therefore they are looking to rehome their dog. After clicking submit on this form they should be sent to their dogs show page (Dog.js - /dogs/:id) to see how their profile looks.

class RehomeForm extends Component {
    constructor(props) {
        super(props);
        // console.log('THIS IS PROPS/////In rehomeForm///////\n', this.props);
        let userID = this.props.location.state.user._id
        let userEmail = this.props.location.state.user.email
        // console.log(userEmail);
        this.state = {
            user: userID,
            email: userEmail,
            name: '',
            breed: 'Affenpinscher',
            size: 'small',
            age: 'baby',
            coat: 'short',
            description: '',
            image: '',
            good_with_children: 'off',
            good_with_dogs: 'off',
            good_with_cats: 'off'

        }
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
        // console.log('This is state\n', this.state);
        // console.log('This is props\n', this.props);

    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const rehomeResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/dogs/new', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const parsedResponse = await rehomeResponse.json();
        // console.log('Status -->>>>>>', parsedResponse.status);
        // console.log('This is parsed Status!!!!!!!!\n', parsedResponse);

        if (parsedResponse.status === 201) {
            // console.log('IN------- RehomeForm.js', parsedResponse);
            // this.props.history.push(`/dogs/${parsedResponse.dog._id}`, parsedResponse)
            this.props.history.push('/dogs/rehome')
        }
    }
    render() {
		const breedlist = breed.map((breed) => {
			return <option value={breed}>{breed}</option>;
		});
        return (
            <Form style={{marginBottom: '10%'}} onSubmit={this.handleSubmit}>
			<Container>
				<h1>Find Your Dog a Forever Home</h1>
				<FormGroup row>
					<Label sm={2}>Name:</Label>
					<Col sm={10}>
          			<Input type="text" name="name" placeholder="Fido" onChange={this.handleChange}>
          			</Input>
        			</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Breed:</Label>
					<Col sm={10}>
          			<Input type="select" name="breed" value={this.state.value} onChange={this.handleChange}>
          				{breedlist}
          			</Input>
        			</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Size:</Label>
					<Col sm={10}>
          			<Input type="select" name="size" value={this.state.value} onChange={this.handleChange}>
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
          			<Input type="select" name="age" value={this.state.value} onChange={this.handleChange}>
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
          			<Input type="select" name="coat" value={this.state.value} onChange={this.handleChange}>
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
						<Input style={{marginLeft: '11%'}} type="textarea" name="description" placeholder="Fido is warm and loving..." onChange={this.handleChange}/>
					</Col>
				</FormGroup>
				<FormGroup>
			        <Label for="file">Upload an image of your dog.</Label>
			        <Col sm={10}>
			        	<Input type="file" encType="multipart/form-data" name="image" onChange={this.handleChange}/>
			        	<FormText color="muted">
			          Input file (jpg, jpeg, png, or gif)
			        </FormText>
			        </Col>
			    </FormGroup>
				<FormGroup tag="fieldset" row check>
    			<legend className="col-form-label">What type of living environment will your dog thrive in? {<br/>} (Click the boxes that describe your dog)</legend>
    			<Col sm={10}>
    				<Label check>
    					<Input type="checkbox" name="good_with_children" value="on" onChange={this.handleChange}/>{' '}
    					Children - your dog is great with children.
    				</Label>
    			</Col>	
    			</FormGroup>
    			<FormGroup tag="fieldset" row check>
    			<Col sm={10}>
    				<Label check>
    					{' '}<Input type="checkbox" name="good_with_dogs" value="on" onChange={this.handleChange}/>
    					Dogs - your dog is great with other dogs.
    				</Label>
    			</Col>	
    			</FormGroup>	
    			<FormGroup tag="fieldset" row check>
    			<Col sm={10}>
    				<Label check>
    					<Input type="checkbox" name="good_with_cats" value="on" onChange={this.handleChange}/>{' '}
    					Cats - your dog is great with cats.
    				</Label>
    			</Col>	
    			</FormGroup>
    			<Col sm={{ size: 3 }}>
                  <Button color="primary" style={{marginTop: "5%"}}>Submit</Button>
                </Col>
			</Container>		
		</Form>
        )
    }
}

export default RehomeForm;