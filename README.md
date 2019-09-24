### CMUT
create-mount-update-template

#### Create
Function which creates DOM element of component. Create takes props, styleContext, options as arguments.

#### Mount
Function which makes specific work when DOM element of component is added to DOM. Returns umount function, which
makes specific work when DOM element of component is removed from DOM. Mount takes 
nodeElement, props, styleContext, options as arguments.

#### Update creator
Function which creates updator to make specific work to update DOM element of component. Some times it should have context, at such point
update creator function should be implemented to provide it from the clojure( it might be used for binding nodeElement
to update function anyway). Update creator takes nodeElement, initialProps, styleContext, options as arguments and 
returns update function which creates    

#### Template
Function which creates components html for server rendering or for compilation.

#### Create vs Mount vs Template 
Create should make the same work that template does, everything else should be handled by mount function. 