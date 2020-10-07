import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
// import { DISHES } from "../shared/dishes";

class DishDetail extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   dishes: DISHES,
    // };
  }



  render() {
    const dish = this.props.dish;
    let comments = this.props.dish.comments;

    const detailDish = () => {
      return (
        <div className="row">

          <Card key={dish.id} className="col-12 col-md-5 m-1">
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>


          <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <div>{renderComments}</div>
          </div>
        </div>
      );
    };


    const renderComments = comments.map((comment) => {
      return (
        <ul className="list-unstyled">
          <li>{comment.comment}</li>
          <li> -- {comment.author}   {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
        </ul>
      );
    });

    return (
      <div className='container'>{detailDish()}</div>
    )

  }
}

export default DishDetail;
