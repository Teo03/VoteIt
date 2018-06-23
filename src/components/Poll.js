import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export class Poll extends React.Component {
    render(){
        return (
            <div className='container'>
                <div>
                <Card>
                    <CardContent>
                        <Typography style={{fontSize: 40}}  component="h1">
                            {this.props.name}
                        </Typography>
                        <Typography variant="headline" component="h2">
                            Created by {this.props.creator}
                        </Typography>
                    </CardContent>
                        <CardActions>
                        <Button variant='raised' color='primary' size="large" style={{fontSize: 20}}>VOTE!</Button>
                        </CardActions>
                </Card>
                </div>
            </div>
        );
    }
}