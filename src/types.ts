export interface TimelyAppConfig {
  /* Oauth client_id from timely */
  clientId: string
  /* Oauth client secret from timely */
  clientSecret: string
  /* account id of timely account */
  accountId: string
}

export interface TimelyAccount {
  id?: number
  name?: string
  color?: string
  currency?: {
    id?: string
    name?: string
    iso_code?: string
    symbol?: string
    symbol_first?: boolean
  }
  logo?: {
    large_retina?: string
    medium_retina?: string
    small_retina?: string
    brand_logo?: boolean
  }
  from?: string
  max_users?: number
  seats?: number
  max_projects?: number
  plan_id?: number
  plan_name?: string
  next_charge?: string
  start_of_week?: number
  created_at?: number
  payment_mode?: string
  paid?: boolean
  company_size?: string
  plan_code?: string
  plan_custom?: boolean
  appstore_transaction_id?: number
  owner_id?: number
  weekly_user_capacity?: number
  default_hour_rate?: number
  support_email?: string
  estimated_company_size?: string
  industry?: string
  num_users?: number
  num_projects?: number
  active_projects_count?: number
  total_projects_count?: number
  capacity?: {
    hours?: number
    minutes?: number
    seconds?: number
    formatted?: string
    total_hours?: number
    total_seconds?: number
    total_minutes?: number
  }
  status?: string
  beta?: boolean
  expired?: boolean
  trial?: boolean
  days_to_end_trial?: number
  features?: {
    [index: string]: {
      name?: string
      days?: number
    }
  }
}

export interface TimelyClient {
  id?: number
  name?: string
  active?: boolean
  external_id?: string
  updated_at?: string
}

export interface TimelyUser {
  id?: number
  email?: string
  name?: string
  active?: boolean
  day_view_onboarded?: boolean
  memory_onboarded?: boolean
  created_at?: number
  updated_at?: number
  last_received_memories_date?: boolean
  sign_in_count?: boolean
  external_id?: string
  time_zone?: string
  avatar?: {
    large_retina?: string
    large?: string
    medium_retina?: string
    medium?: string
    small_retina?: string
    small?: string
  }
  type?: string
  weekly_capacity?: number
  user_level?: string
  admin?: boolean
  hide_hourly_rate?: boolean
  deleted?: boolean
  default_hour_rate?: number
  role_id?: number
  role?: {
    id?: number
    name?: string
  }
}
