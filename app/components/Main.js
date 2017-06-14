// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved")
// Helper Function
var helpers = require("./utils/helpers.js");

// This is the main component.
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return { searchTerm: "", results: [], };
  },

  // If the component updates we'll run this code
  componentDidUpdate: function(prevProps, prevState) {

    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.state.searchTerm, this.state.srtDate, this.state.endDate).then(function(data) {
        if (data !== this.state.results) {
          console.log("HERE");
          console.log(data);

          this.setState({ results: data });
        }


        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
      }.bind(this));
    }
  },
  // We use this function to allow children to update the parent with searchTerms.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },

  onClickTest: function(e){
    e.preventDefault();
    console.log("you clicked me")
  },

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h2 className="text-center">NYT Article Finder</h2>
            <p className="text-center">
              <em>Enter a term, returns relevant NYT articles.</em>
            </p>
          </div>

          <div className="row">

            <Form setTerm={this.setTerm} setSrtDate={this.setSrtDate} setEndDate={this.setEndDate}/>

          </div>

          <div className="row">

            <Results articlesFound={this.state.results} />

          </div>

          <div className="row">

            {/* <Saved articles={this.state.articles}/> */}

          </div>

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
