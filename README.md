## geogenerator
Project to help with generating sample or testing geometry. 
Built on top of [Leaflet](http://leafletjs.com/) and [Twitter Bootstrap](http://getbootstrap.com/).



node dependencies:
* [Express](http://expressjs.com/4x/api.html)

To start the server:
```javascript
node app
```

token is stored in the config.json file, for now leaving the actual token out of the repository.  The following command was run on config.json:

```
git update-index --assume-unchanged private/config.json
```

To undo these and commit further changes - run the following command

```
git update-index --no-assume-unchanged private/config.json
```
