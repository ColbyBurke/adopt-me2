import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";
import Modal from "./Modal";

class Details extends React.Component {
    state = { loading: true, showModal: false };

    componentDidMount() {
        pet
            .animal(+this.props.id)
            .then(({ animal }) => {
                this.setState({
                    name: animal.name,
                    animal: animal.type,
                    location: `${animal.contact.address.city}, ${
                        animal.contact.address.state
                        }`,
                    description: animal.description,
                    media: animal.photos,
                    breed: animal.breeds.primary,
                    loading: false,
                    url: animal.url
                });
            })
            .catch(err => this.setState({ error: err }));
    }
    toggleModal = () => this.setState({ showModal: !this.state.showModal });
    adopt = () => navigate(this.state.url);
    render() {
        if (this.state.loading) {
            return <h1>loading … </h1>;
        }

        const {
            media,
            animal,
            breed,
            location,
            description,
            name,
            url,
            showModal
          } = this.state;

        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} — ${breed} — ${location}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button style={{ backgroundColor: theme }} onClick={this.toggleModal}>
                                Adopt {name}
                            </button>
                        )}
                    </ThemeContext.Consumer>;
                    <p>{description}</p>
                </div>
            </div>
        );

    }
    
}

export default Details;