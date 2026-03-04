/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_95057082")

  // update collection data: correct createRule to compare user id properly
  unmarshal({
    "createRule": "@request.auth.id != \"\" && (@request.body.user == @request.auth.id || @request.body.user[0] == @request.auth.id)",
    "deleteRule": "",
    "listRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_95057082")

  // rollback to previous rule (the faulty one) for safety
  unmarshal({
    "createRule": "@request.auth.id != \"\" && @request.body.user.id = @request.auth.id",
    "deleteRule": "",
    "listRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
