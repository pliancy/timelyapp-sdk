export interface TimelyAppConfig {
  /** temporary for dev work */
  token: string
  /** account id of your timely company account */
  accountId: string
  /** timeout for http requests. 20000ms by default */
  timeout?: number
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

export interface TimelyLabel {
  id?: number
  name?: string
  sequence?: number
  parent_id?: number
  emoji?: string
  active?: boolean
  children: TimelyLabel[]
}

export interface TimelyProject {
  id: number
  active: boolean
  account_id: number
  name: string
  color: string
  rate_type: string
  billable: boolean
  updated_at?: number
  external_id: string
  budget_scope: any
  client: TimelyClient
  required_notes: boolean
  budget_expired_on?: any
  has_recurrence: boolean
  enable_labels: 'all' | 'none' | 'custom'
  budget: number
  budget_type: string
  hour_rate: number
  hour_rate_in_cents: number
  budget_progress: number
  budget_percent: number
  users: TimelyProjectUser[]
  labels: TimelyProjectLabel[]
  label_ids: number[]
  required_label_ids: number[]
  cost: TimelyProjectCost
  estimated_cost: TimelyProjectCost
  duration: TimelyProjectDuration
  estimated_duration: TimelyProjectDuration
  billed_cost: TimelyProjectCost
  billed_duration: TimelyProjectDuration
  unbilled_cost: TimelyProjectCost
  unbilled_duration: TimelyProjectDuration
}
export interface TimelyProjectDuration {
  hours: number
  minutes: number
  seconds: number
  formatted: string
  total_hours: number
  total_seconds: number
  total_minutes: number
}
export interface TimelyProjectCost {
  fractional: number
  formatted: string
  amount: number
}
export interface TimelyProjectUser {
  user_id: number
  hour_rate: number
  hour_rate_in_cents: number
  updated_at?: string
  created_at?: string
  deleted: boolean
}
export interface TimelyProjectClient {
  id: number
  name: string
  active: boolean
  external_id: string
  updated_at?: string
}

export interface TimelyProjectLabel {
  project_id: number
  label_id: number
  budget: number
  required: Boolean
  updated_at?: Date | string
}

export interface AddTimelyProject {
  name: string
  active: boolean
  currency_code: string
  color: string
  client_id: number
  budget_type: string
  users: Array<{ user_id: number }>
  rate_type?: string
  hour_rate?: number
  budget?: number
  billable?: boolean
  external_id?: string
  send_invite?: boolean
  required_notes?: boolean
  budget_recurrence?: { recur: string; start_date: Date | string; end_date: Date | string; recur_until: Date | string }
  labels?: [Array<{ label_id: number; required: boolean }>]
  enable_labels?: 'all' | 'none' | 'custom'
}

export interface TimelyRole {
  id: number
  name: string
  display_name: string
  description: string
  scopes: [
    {
      name: string
      display_name: string
      description: string
      default: string
      options: any[]
    },
  ]
  default: boolean
}

export interface TimelyUserCapacity {
  user_id: number
  capacities: TimelyCapacity[]
}

export interface TimelyCapacity {
  id?: number
  weekly_capacity: number
  daily_capacity: number
  weekdays: string
  total_working_days?: number
  weekly_working_days?: number
  current: boolean
  start_date?: string
  end_date?: string
}
