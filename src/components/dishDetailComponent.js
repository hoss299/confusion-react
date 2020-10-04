import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import { DISHES } from "../shared/dishes";

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    let dish = this.props.dish;
    let comments = this.props.comments;

    const detailDish = () => {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <Card key={dish.id}>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>

          <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <div>{renderComments}</div>
          </div>
        </div>
      );
    };

    const renderComments = comments.map((comment) => {
      return (
        <div>
          <div>
            <p>{comment.comment}</p>
            <p> -- {(comment.author, comment.date)}</p>
          </div>
        </div>
      );
    });

    return detailDish();
  }
}

export default DishDetail;
