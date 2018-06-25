import React from 'react';
import {Bar} from 'react-chartjs-2';

export class Chart extends React.Component {
    constructor(props){
        super(props);
        this.reload = this.reload.bind(this);
    }

    componentWillReceiveProps= (nextProps) => {
      this.setState(nextProps);
    }

    reload = () => {
        return {
            labels: this.props.labels,
            datasets: [
              {
                label: 'Number of votes',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: this.props.data
              }
        ]
        }
    }
      render = () => {
        return (
          <div>
            <Bar 
              data={this.reload}
              width={100}
              height={300}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
        );
      }
}