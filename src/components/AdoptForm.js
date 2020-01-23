import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import breed from '../breed';

// Component Description (Private):
// This is a Form Page that shows only if the users results return true for adopting. After clicking submit on this form they should be sent to their user matches page (UserMatches.js - /dogs/:id) to see how their profile looks.

class AdoptForm extends Component {
	constructor(props){
		super(props);
		// console.log('THIS IS PROPS/////In AdoptForm///////\n',props.location.state.user);
		let zip = props.location.state.user.zip_code
		let user = props.location.state.user
		// console.log(typeof zip);
		this.state = {
			breed:'Affenpinscher',
			size: 'small',
			age: 'baby',
			coat:'short',
			good_with_children: 'off',
			good_with_dogs: 'off',
			good_with_cats: 'off',
			zip_code: zip,
			user: user

		}
	}
	handleChange = (e) => {
		// console.log(e);
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
		// console.log('This is state\n',this.state)
	}
	handleSubmit = async (e) => {
		// console.log('this is preventDefault');
		e.preventDefault();
		const adoptResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/dogs/adopt',{
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		// console.log('THIS IS THE adoptResponse');
		const parsedResponse = await adoptResponse.json();
		// console.log(parsedResponse);
		if (parsedResponse.status === 200) {
			// console.log('IN');
			this.props.history.push(`/users/${this.state.user._id}`, parsedResponse)
		} 
	}
    render(){
		const breedlist = breed.map((breed) => {
			return <option value={breed}>{breed}</option>;
		});    	
    	return (
        <Form style={{marginBottom: '10%'}} onSubmit={this.handleSubmit}>
			<Container>
				<h1>Let's Find Your New Member of the Family</h1>
				<br />
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
				<FormGroup tag="fieldset" row check>
    			<legend className="col-form-label">Does your dog need to be:</legend>
    			<Col sm={10}>
    				<Label check>
    					<Input type="checkbox" name="good_with_children" value="on" onChange={this.handleChange}/>{' '}
    					Good with children? 
    				</Label>
    			</Col>	
    			</FormGroup>
    			<FormGroup tag="fieldset" row check>
    			<Col sm={10}>
    				<Label check>
    					{' '}<Input type="checkbox" name="good_with_dogs" value="on" onChange={this.handleChange}/>
    					Good with dogs? 
    				</Label>
    			</Col>	
    			</FormGroup>	
    			<FormGroup tag="fieldset" row check>
    			<Col sm={10}>
    				<Label check>
    					<Input type="checkbox" name="good_with_cats" value="on" onChange={this.handleChange}/>{' '}
    					Good with cats? 
    				</Label>
    			</Col>	
    			</FormGroup>
    			<Col sm={{ size: 3 }}>
    				<br />
                  <Button color="primary">Fetch</Button>
                </Col>
			</Container>		
		</Form>
    )
    }
}

export default AdoptForm;