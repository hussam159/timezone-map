import React, { Component } from 'react';
import { LabeledArc } from './Arc';
import { pie} from 'd3-shape';
class Piechart extends Component {
    constructor() {
        super();
        this.colors =['#5a97fa', '#5afa6d', 
        '#faf257', '#57fab9'];
        this.p_pie = pie().value(function(d) { return d.value});
    
    }
    componentWillReceiveProps(newProps) {
        this.renderChart(newProps);
    }
    arcGenerator(d, i) {
        return (
            <LabeledArc key={`arc-${i}`}
                        data={d}
                        innerRadius={this.props.innerRadius}
                        outerRadius={this.props.outerRadius}
                        color={this.colors[i]} />
        );
    }
    renderChart(){
        let x_pie = this.p_pie(this.props.data),
        translate = `translate(${this.props.x}, ${this.props.y})`;
        
    return (
        <svg  width={300}
        height={200}>
        <g transform={translate}>
            {x_pie.map((d, i) => this.arcGenerator(d, i))}
        </g>
        </svg>
    )
    }
    render() {
    return (
        <div>{this.renderChart()}</div>)
    }
}
 
export default Piechart;