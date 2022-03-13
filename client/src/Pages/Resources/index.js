import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

// import './stylesheet.css';
import useAuth from "../../hooks/auth";
import Filters from "./components/Filters";
import PostingMenu from "../../components/PostingMenu";


// This page will bring together the filters, posts and the posting menu
// The posts will be resource posts that will need to be curated from a new api site.

const ResourcePage = () => {
  useAuth();

  return (
    <div className="ResourcesPage">
      <Filters/>
      <h1>Welcome to the Resources Page! We are currently under construction. Come back later</h1>
    </div>

  )
}

export default ResourcePage;