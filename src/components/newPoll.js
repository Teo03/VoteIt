import React from 'react';
import { Nav } from './Nav';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

export class newPoll extends React.Component {
    constructor() {
        super();
        this.state = {
            pollName: '',
            options: [],
            tempOption: '',
            open: false,
            error: false,
            open: false,
            message: ''
        }
        this.add = this.add.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitPoll = this.submitPoll.bind(this);
    }

    add = () => {
        var option = {
            option: this.state.tempOption,
            votes: 0
        }
        this.state.options.push(option);
        this.setState({ tempOption: '' });
    }
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange1 = (e) => {
        this.setState({ pollName: e.target.value, error: false});
    }

    handleChange2 = (e) => {
        this.setState({ tempOption: e.target.value, error: false});
    }

    handleClickOpen = () => {
        this.setState({ open: true, error: false });
      };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    submitPoll = () => {
        var {pollName, options} = this.state;
        if(pollName === '' || options.length === 0){
            this.setState({error: true});
            return this.setState({open: true, message: 'Please enter a name and add options.'});
        } else {
            return axios.get("/info").then(response => {
                axios.post('/add', {
                    name: this.state.pollName,
                    options: this.state.options,
                    creator: response.data.username
                }).then(res => {
                    if(res.data.error){
                        alert(res.data);
                        this.setState({error: true, pollName: '', options: []});
                    } else {
                        this.setState({error: false, pollName: '', options: []});
                        this.props.history.push('/');
                    }
                });
            });
        }
    }

    render = () => {
        var options = this.state.options;
        var optionsArr = [];
        for (var key in options) {
          if (options.hasOwnProperty(key)) {
            optionsArr.push(options[key]['option']);
          }
        }
        return (
            <div className='container text-center'>
                <Nav />
                <h2>Create a Poll</h2>
                <br />
                <h3>Enter the name of your Poll</h3>
                <br />
                <Input value={this.state.pollName} onChange={this.handleChange1} style={{fontSize: 30}} error={this.state.error}/>
                <br />
                <h3>Options</h3>
                <h4>You can add as many options as you want</h4>
                <div className='container'>
                    <h3 className='options'>
                    {optionsArr.map((option, index) => (
                        <Paper elevation={4} key={index}>
                        <Typography variant="headline" component="h2" style={{fontSize: 40}}>
                          {option}
                        </Typography>
                      </Paper>
                    ))}
                    </h3>
                </div>
                <Button variant="raised" size="large" color="default" style={{fontSize: 15}} onClick={this.handleClickOpen}>ADD</Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle style={{fontSize: 30}}>New Option</DialogTitle>
                    <DialogContent className='text-center'>
                        <DialogContentText style={{fontSize: 20}}>
                        Type the option to vote on for your poll below:
                        </DialogContentText>
                        <Input style={{fontSize: 25}} value={this.state.tempOption} onChange={this.handleChange2}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary" style={{fontSize: 15}}>
                        Cancel
                        </Button>
                        <Button onClick={this.add} color="primary" style={{fontSize: 15}}>
                        ADD OPTION
                        </Button>
                    </DialogActions>
                </Dialog>
                <br />
                <br />
                <Button variant="raised" size="large" color="primary" style={{fontSize: 20}} onClick={this.submitPoll}>SUBMIT</Button>
                </div>
        );
    }
}