import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Poll } from './Poll';

export class PollsView extends React.Component {
    constructor(){
        super();
        this.state = {
            polls: []
        }
    }

    componentDidMount = () => {
        return axios.get('/getPollData').then(res => {
            this.setState({polls: res.data});
        });
    }

    render = () => {
        var polls = this.state.polls;
        var pollArr = [];
        for(var i = 0; i < polls.length; i++){
            var name = polls[i].name;
            var creator = polls[i].creator;
            var id = polls[i]._id;
            pollArr.push(<Poll name={name} creator={creator} key={id} id={id}/>);
        }
        return (
        <div className='container'>
            <div className='headpolls'>
               <h1>Polls:</h1>
               <a href='/newPoll'>
               <Button variant='raised' color='secondary' size="large" style={{fontSize: 15}}>ADD POLL</Button>
               </a>
            </div>
            {pollArr}
         </div>
        );
    }
}