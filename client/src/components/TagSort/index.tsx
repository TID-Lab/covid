// @ts-nocheck
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTags } from '../../api/tag';
import React from 'react';
import './index.css';

class TagSort extends React.Component {
  //dispatch = useDispatch();
  constructor(props: any) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      tagNames: [],
    };
  }
  /*
   const TAGSort = () => {
     const tagSort = useSelector(state => state.filters.tagSort);
     const dispatch = useDispatch();
   }
   */
  onChange(e) {
    //dispatch({ type: 'TagSort/set', payload: e.target.value });
  }
  async componentDidMount() {
    const tagNames = await fetchTags();
    //.then((tag)=>tag.name)
    this.setState({ tagNames });
  }
  render() {
    return (
      <div className="TagSort">
        <select onChange={this.onChange}>
          {this.state.tagNames.map((val) => (
            <option key={val.name} value={val.name}>
              {val.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default TagSort;
