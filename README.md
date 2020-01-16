<div align="center">
  <a href="https://vk.com/bklet">
    <img width="100" height="100" src="https://sun9-62.userapi.com/c857532/v857532900/69bc7/KHuyVcx3_Wg.jpg">
  </a>
  <br>
  <br>

  [![npm][npm]][npm-url]
  [![deps][deps]][deps-url]

</div>

# Simple reminder, how does this shit works.
Table of contents
-----------------
1. [Redux](#Redux)

## Redux
There are 2 reducers, which are collect the state of the app:
1. App presentation reducer:\
    This reducer stores all information about how the app
    should look like: current active view, active panel, opened
    modal, popouts, etc.\
    Fields:
    * Active view - current active view
    * Active panel - current active panel
    * Modal - shows weather any modal is active. Type can be `null` or
    `string` (id of modal)
    * Popout - as well as modal. The difference is type might be `React child` 
2. Auth values reducer:\
    This one collect all data values from auth page.\
    Fields:
    * login - value of the login field
    * password - value of the password field
    * region - value of the region drop-down
    * province - value of the province drop-down
    * city - value of the city drop-down
    * school - value of the school drop-down
3. Profile data reducer:\
    Contains all information about profile.\
    Fields:
    * diary - value of diary
    * id - value of id
    * secret - value of id
    * students - list of students, bind to profile 
    * student - current student
#
[npm]: https://img.shields.io/npm/v/@vkontakte/create-vk-mini-app.svg
[npm-url]: https://npmjs.com/package/@vkontakte/create-vk-mini-app

[deps]: https://img.shields.io/david/vkcom/create-vk-mini-app.svg
[deps-url]: https://david-dm.org/vkcom/create-vk-mini-app