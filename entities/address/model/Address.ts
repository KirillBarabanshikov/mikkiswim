export interface Address {
  value: string
  unrestricted_value: string
  data: {
    postal_code: string
    country: string
    country_iso_code: string
    federal_district: string | null
    region_fias_id: string | null
    region_kladr_id: string | null
    region_iso_code: string | null
    region_with_type: string | null
    region_type: string | null
    region_type_full: string | null
    region: string | null
    area_fias_id: string | null
    area_kladr_id: string | null
    area_with_type: string | null
    area_type: string | null
    area_type_full: string | null
    area: string | null
    city_fias_id: string | null
    city_kladr_id: string | null
    city_with_type: string | null
    city_type: string | null
    city_type_full: string | null
    city: string | null
    geo_lat: string | null
    geo_lon: string | null
    beltway_hit: string | null
    beltway_distance: string | null
    metro: string | null
    divisions: string | null
    qc_geo: number
    qc_complete: string | null
    qc_house: string | null
    history_values: string | null
    unparsed_parts: string | null
    source: string | null
    qc: string | null
  }
}
