import {DocumentNode, gql} from '@apollo/client';
import {Category} from "./types";

export const GET_ALL_PEOPLE = gql`
  query GetAllPeople($first: Int, $after: String) {
    allPeople(first: $first, after: $after) {
      edges {
        node {
          id
          name
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ALL_FILMS = gql`
  query GetAllFilms($first: Int, $after: String) {
    allFilms(first: $first, after: $after) {
      edges {
        node {
          id
          title
          releaseDate
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ALL_PLANETS = gql`
query GetAllPlanets($first: Int, $after: String) {
  allPlanets(first: $first, after: $after) {
    edges {
      node {
        id
        name
        diameter
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const GET_ALL_SPECIES = gql`
query GetAllSpecies($first: Int, $after: String) {
  allSpecies(first: $first, after: $after) {
    edges {
      node {
        id
        name
        classification
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const GET_ALL_STARSHIPS = gql`
query GetAllStarships($first: Int, $after: String) {
  allStarships(first: $first, after: $after) {
    edges {
      node {
        id
        name
        model
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const GET_ALL_VEHICLES = gql`
query GetAllVehicles($first: Int, $after: String) {
  allVehicles(first: $first, after: $after) {
    edges {
      node {
        id
        name
        model
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const GET_PLANET = gql`
query GetPlanet($id: ID!) {
  planet(id: $id) {
    id
    name
    residentConnection {
      residents {
        id
        name
        vehicleConnection {
          vehicles {
            name
            model
            vehicleClass
            manufacturers
          }
        }
        starshipConnection {
          starships {
            name
            model
            manufacturers
            starshipClass
          }
        }
      }
    }
  }
}
`;

export const GET_PERSON = gql`
  query GetPerson($id: ID!) {
    person(id: $id) {
      name
      birthYear
      eyeColor
      gender
      hairColor
      height
      mass
      skinColor
      species {
        name
        classification
      }
      homeworld {
        name
      }
    }
  }
`;

export const categoryToQuery: Record<Category, DocumentNode> = {
  allPeople: GET_ALL_PEOPLE,
  allFilms: GET_ALL_FILMS,
  allPlanets: GET_ALL_PLANETS,
  allSpecies: GET_ALL_SPECIES,
  allStarships: GET_ALL_STARSHIPS,
  allVehicles: GET_ALL_VEHICLES,
};
