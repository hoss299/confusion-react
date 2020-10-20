import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label, Col, Row, Modal, ModalHeader, ModalBody} from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentModalOpen: false,
    };
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
  }

  toggleCommentModal() {
    this.setState({
        isCommentModalOpen: !this.state.isCommentModalOpen,       
    });
  }

  render() {
    
      return(
        <React.Fragment>
          <Button outline onClick={this.toggleCommentModal}>
            <span className="fa fa-pencil fa-lg"></span> Submit Comment
          </Button>
  
          <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
            <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm className="m-3">
                <Row className="form-group" >
                  <Label htmlFor="rating" >Rating</Label>
                    <Control.select className="form-control" id="rating" name="rating" model=".rating" placeholder="1">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>                           
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text className="form-control" id="author" name="author" placeholder="Your Name" model=".author" validators={{required,  minLength:minLength(3), maxLength:maxLength(15)}}/> 
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />          
                </Row>
                <Row className="form-group">
                  <Label htmlFor="newComment">Comment</Label>
                  <Control.textarea className="form-control" id="newComment" name="newComment" rows="8" model=".newComment"/>           
                </Row>
                <Row className="form-group">
                  <Button type="submit" color="primary" >Submit</Button>           
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </React.Fragment>      
      )
    
  }
    
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card key={dish.id} >
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div>i</div>;
  }
}

function RenderComments({ comments , dish }) {
  if (comments != null) {
    return (
      <>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <li>
                <p>{comment.comment}</p>
                <p> -- {comment.author}   {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                </p>
              </li>
            )
          })}
        </ul>
        <CommentForm />
      </>
    )
  } else {
    return <div>am</div>;
  }
}

function DishDetail(props) {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} dish={props.dish} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>hoss</div>;
  }
}


export default DishDetail;
