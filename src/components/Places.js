import React from 'react';

class Places extends React.Component {

    state = {
        stops: this.props.stops,
    }

    componentWillReceiveProps = (nextProps) => this.setState({
        stops: nextProps.stops,
    })

    render(){
        const list = this.state.stops.map((stop, i) => {
            return (
                <li key={i}>
                    <span>{++i}.</span> {stop.name}
                    <small>Location: {stop.locality}</small>
                </li>
            )
        })
        return (
            <div className="places-container">
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default Places;
