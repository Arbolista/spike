## Current Development Concepts

There are several aspects of Spike that are designed to scale for large, complex client side applications.

Below are suggestions for a directory structure that makes the most out of Spike's design.

### Layout Components
*shared/components/layouts*

Components that rendered within (`shared/components/layout`) for a specific route. The route provides the component via `Route#component` to `LayoutComponent`.

- generate these with `npm run generate -- --what layout --name SomeLayout`.

This will generate the component and route.

### Shared Components
*shared/components/shared*

Meant for abstracting away UI that appears in multiple places.

### Util Components
*shared/components/utils*

Meant for abstracting away simple UI behavior and functions, such as a `RouteLink` which renders a link element, but would use `SpikeComponent#pushRoute` to update browser history.

### Mixins
*shared/lib/mixins*

Meant for abstracting away shared data/ functional behavior across components, such as initialization of models, prop calls, etc. For shared UI presentation use a shared component.

- Favor verbose method names to avoid conflicts with methods from the components or other mixins.
- The components should NOT call any standard React lifecycle methods (`constructor`, `componentDidMount`). Instead they should provide methods the components can call themselves from those methods.

### Base Classes
*shared/lib/base_classes*

Classes with a common set of mixins. `SpikeComponent` provides convenience methods for accessing Router and StateManager. Most notably:

- `pushRoute` - to navigate to another route from within a component. Accepts the name of the route and optionally a action function and payload to pass to the action. The action object will be passed as the location state, which will then be dispatched from the history listener. For instance, `component.pushRoute('Dashboard', login, {user: {id: 1}})`.
  - In the case of including a specific action, there is no need to call `assignTo` (see `redux-act`) and pass the action in via props. Simply, import the action, and pass it as the second argument. The router, will properly dispatch the action.

### Models
*shared/models*.

Models are essentially helpers for state or form objects. They accept an Immutable state object and could provide helpers for:

- validating the object (see [validation docs!](client/lib/validation/readme.md).
- displaying object data (eg `User#full_name`).
- calculating object data (eg `Cart#item_total`).
- Making api calls to save the data.

### Api
*client/api*

Api classes provide a few purposes:

- Ability to create different API responses based on the API directory specified in client webpack configurations (or `api_base_url` command line argument). For instance, in development, before you have implemented an API, you could create a set of fixture api classes which return fixture data within a promise. Once the API is implemented, you can create the parallel class in another API directory which returns the results of a real API call. This may also be useful for testing.
- Encourage development of API modules that will maintain the same interface regardless of changes to base routes, paths, headers, etc, as well as dry up details related to adding headers, parsing responses, etc.

### Routes
*shared/lib/routes*

Url paths all mapped to specific route path. Routes initialized with path regex and parameters object for parsing url.

- Route objects may also implement a `url` method, which accepts the new location state object, so it can create a precise url based on that location state (eg a user route may accept a `{type: `DETAIL_USER`, id: 1}` action and return the url `/users/1`).
- Each route must have a `component` attribute that returns the top level layout component for that route.

### Reducers
*shared/reducers*

Reducer files are responsible for the following:
1. Creating and exporting a reducer for its given store resource.
2. Creating action objects, which can be exported, passed to components via containers, and later used to dispatch [actions](https://github.com/pauldijou/redux-act) within the components.
3. Document the store structure for the particular resource.
4. API calls should always be intiated within reducers (called directly off API class or through a model). Actions that initiate API calls, should then return a [redux-loop](https://github.com/raisemarketplace/redux-loop) promise effect. It should update state to reflect API call in progress and update state according to any API errors.

### Containers
*shared/components...*

Containers can live with their components (or you could put them in `shared/lib/shared_containers`). Containers server two purposes:
1. Pass store data into the component.
2. Pass in [actions](https://github.com/pauldijou/redux-act) and assign them to Redux store.

Two caveats,
- In the case of dispatching action while updating route (ie via `Component#pushRoute`), it is not necessary to pass the action in via container. `Router#onLocationChange` will properly dispatch the action.
- Prefer to use containers for layout components, however, feel free to pass props in directly to any nested or shared components.

### Router
*shared/lib/router*

Responsible for initializing [history](https://github.com/mjackson), updating the current route, and dispatching actions from history listener.

### StateManager
*shared/lib/state_manager*

Responsible for initalizing store and reducers, as well as getting initial data on client side.


