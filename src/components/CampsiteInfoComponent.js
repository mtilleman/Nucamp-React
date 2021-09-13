import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: '',
            author: '',
            commentMessage: '',
            touched: {
                rating: false,
                author: false,
                commentMessage: false,
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.dropdownSelector = this.dropdownSelector.bind(this);
    }

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    dropdownSelector() {
        this.setState({

        });
    }

    render() {    

        return(
            <>
                <Row className="form-group">
                    <Col md={12}>
                        <Button outline onClick={this.toggleModal}>
                            <i className="fa fa-pencil fa-lg" /> Submit Comment
                        </Button>
                    </Col>
                </Row>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values =>this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        placeholder="rating"
                                        className="form-control"
                                        validators={{
                                            required,
                                        }}
                                        >
                                        <option>Select Rating</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required'
                                        }}
                                    />
                                </Col>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author" md={2}>Name</Label>
                                <Col>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="commentMessage" md={2}>Comment</Label>
                                <Col>
                                    <Control.textarea model=".commentMessage" id="commentMessage" name="commentMessage"
                                        rows="6"
                                        className="form-control"
                                    />
                                </Col>
                            </div>
                            <Button type="submit" color="primary">
                                Submit Comment
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderComments({comments}) {
    if(comments) {
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map((comment) => {
                    return(
                        <div key={comment.id}>
                            <p>{comment.text}</p>
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    );
                })}
                <CommentForm />
            </div>
        );
    }
    return <div />;
}

function CampsiteInfoComponent(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } else {
        return <div />
    }
}

export default CampsiteInfoComponent;