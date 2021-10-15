const fs = require("fs");

const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
} = require("../lib/zookeepers.js");

const { zookeepers } = require("../data/zookeepers.json");

jest.mock("fs");

test("creates a zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    {name: "Aaron", id: "asdgasgdsfgsfads"},
    zookeepers
  );

  expect(zookeeper.name).toBe("Aaron");
  expect(zookeeper.id).toBe("asdgasgdsfgsfads");
});

test("filters by query", () => {
  const startingKeepers = [
    {
      id: "1",
      name: "Dan",
      age: 37,
      favoriteAnimal: "parrot"
    },
    {
      id: "22",
      name: "Ronald",
      age: 44,
      favoriteAnimal: "alligator"
    },
  ];

  const updatedKeepers = filterByQuery({ favoriteAnimal: "parrot"}, startingKeepers);

  expect(updatedKeepers.length).toEqual(1);
});

test("finds by Id", () => {
  const startingKeepers = [
    {
      id: "1",
      name: "Dan",
      age: 37,
      favoriteAnimal: "parrot"
    },
    {
      id: "22",
      name: "Ronald",
      age: 44,
      favoriteAnimal: "alligator"
    },
  ];

  const keeperId = findById("22", startingKeepers);
  expect(keeperId.name).toBe("Ronald");
});

test("validates favorite animal", () => {
  const keeper = {
    id: "22",
    name: "Ronald",
    age: 44,
    favoriteAnimal: "alligator"
  };
  const invalidKeeper = {
    id: "22",
      name: "Ronald",
      age: 44,
      favoriteAnimal: ""
  };
  console.log(keeper);
  
  const result = validateZookeeper(keeper);
  console.log(result);
  const result2 = validateZookeeper(invalidKeeper);
  console.log(result2);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});