## HelperLookup

```
meteor add ultimatejs:helper-lookup
```

This mixin brings automatic "lookups" or "dynamic helper inheritance" to your React components. That means you no longer have to endlessly pass down state as props, and definitely not event handler methods. These are considered "boilerplate" that are no longer required with React if you use these mixins.

Passing down event handler methods has been the biggest annoyance to developers moving to React from Blaze. At first it's hard to grasp. Once you grasp it, you still have lost the "separations of concerns" principle that using event selectors provides.

Check out the examples below to see how you can define methods on parent components that child components automatically have access to. The methods will use the instance of the parent component as the context, while switching in the `props` to be what you would expect coming from the child component. The net result is child components can share the state of parent components, but with the `props` where the method is called.

The workflow this will provide is one where you will define methods associated with a particular state on a designated parent component, and that will be all you have to do to put state in the correct place according to the successful "state management" pattern React has pioneered.


GOTCHA: since `props` are switched out to be that of the implementing child component, you can access the parent's props via `this.ownProps` within the handler.

CAVEAT: `this.someMethod(this.anotherMethod())` will not currently work. You cannot call another method as a parameter. This will be resolved in future versions.

## EXAMPLE:

```
ParentComponent = React.createClass({
	mixins: [HelperLookup],

	title() {
		let parentTitle = this.state ? this.state.title : 'n/a';
		return `${parentTitle} > ${this.props.name}`;
	},
	
	setTitle() {
		let title = prompt('enter a title');
		this.setState({title: title});
	},
	
	render() {
		return (
			<div>
				<ChildComponent name={'child 1'} />;
				<ChildComponent name={'child 2'} />;
			</div>
		);
	}
});


ChildComponent = React.createClass({
	mixins: [HelperLookup],

	render() {
		return (
			<div>
				<h1>My title is: {this.title}</h1>
				<button onClick={this.setTitle()}>Set Title</button>
			</div>
		);
	}
});
```

----
###An example app has been prepared to quickly test it. 
Give it a try: https://github.com/ultimatejs/tracker-react-todos-example

*Thanks for helping us bridge the Blaze world we know to what will be a delightful React future.* **Long Live Meteor!** *Stay tuned for more coming out of the* [***Sideburns***](https://github.com/timbrandin/blaze-react) and ***Blaze React*** *project. Pull requests welcome.*  

######FINAL NOTE: make sure to check out `TrackerReact` as well. That is perhaps the biggest evolution in bringing Blaze behavior to React. Here it is: http://github.com/ultimatejs/tracker-react
