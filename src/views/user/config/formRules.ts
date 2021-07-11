import rules from '@/config/rules'

export default {
    'name': [rules.required(), rules.limit(2, 5)],
    'age': [rules.required(), rules.limit(2, 3)],
    'mobile': [rules.required(), rules.mobile()],
}
