export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}

export interface Rank {
  importance: number;
  confidence: number;
  confidence_city_level: number;
  match_type: string;
}

export interface Properties {
  datasource: Datasource;
  name: string;
  city: string;
  state: string;
  country: string;
  country_code: string;
  lon: number;
  lat: number;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  result_type: string;
  rank: Rank;
  place_id: string;
  county: string;
  town: string;
  state_code: string;
  postcode: string;
  village: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Items {
  type: string;
  properties: Properties;
  geometry: Geometry;
  bbox: number[];
}

export interface Parsed {
  city: string;
  expected_type: string;
}

export interface Query {
  text: string;
  parsed: Parsed;
}

export interface CitiesSearchResponse {
  features: Items[];
}

export interface SearchResult {
  id: string;
  name: string;
  formatted: string;
  state: string;
  location: Location;
}

interface Location {
  lat: string | number;
  lon: string | number;
}

export interface FavoriteCity {
  id: string;
  state: string;
  city: string;
  location: Location;
}
