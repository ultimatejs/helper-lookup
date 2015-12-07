if(Meteor.isServer) return HelperLookup = {}; //so server side rendering isn't broken

HelperLookup = {
		__lookup(name, args) {
			let component = this;
			let method;

			//climb component tree backwards looking for first component that defines method:
			while(component && !method) { 
				if(component[name]) method = component[name]; //component has method 
				else component = component.props.__parent; 		//or we climb to next parent
			}
			
			//look for global helper:
			if(!method && Template.__helpers[name]) {
				return Template.__helpers[name].apply(this, args);
			}		
			
			return method ? this._applyHelperWithProps(component, method, args) : ''; //dont return `undefined` in templates
		},
		_applyHelperWithProps(component={}, method, args) {
			let oldProps = component.props; 					//swap props to Blaze helper/event context
			component.props = this.props; 						//which is that of current child component
			component.ownProps = oldProps;						//continue to provide access to `oldProps if necessary
			
			let ret = method.apply(component, args); 	//gather return value
			
			component.props = oldProps; 							//put props back for other methods to utilize like normal
			delete component.ownProps;
			
			return ret;
		}
};