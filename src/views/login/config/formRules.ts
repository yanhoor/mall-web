import rules from '@/config/rules'

export default {
    'mobile': [rules.required(), rules.mobile()],
    'name': [rules.required()],
    'password': [rules.required()],
}
