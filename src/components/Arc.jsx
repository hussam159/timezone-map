import React, { Component } from 'react';
import {arc} from 'd3-shape';
 
class Arc extends Component {
    constructor() {
        super();
        this.p_arc = arc();

    }
 
    componentWillMount() {
        this.updateD3(this.props);
    }
 
    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }
 
    updateD3(newProps) {
        this.p_arc.innerRadius(newProps.innerRadius);
        this.p_arc.outerRadius(newProps.outerRadius);
    }
 
    render() {
        return (
            <path d={this.p_arc(this.props.data)}
                  style={{fill: this.props.color}}></path>
        );
    }
}
class LabeledArc extends Arc {
    render() {
        let [labelX, labelY] = this.p_arc.centroid(this.props.data),
            labelTranslate = `translate(${labelX}, ${labelY})`;
        return (
            <g>
                {super.render()}
                <text transform={labelTranslate}
                      textAnchor="middle">
                    {this.props.data.data.label}
                </text>
            </g>
        );
    }
}
 
export { LabeledArc };
 
