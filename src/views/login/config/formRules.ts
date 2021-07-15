import rules from '@/config/rules'

export default {
    'mobile': [rules.required(), rules.mobile()],
    'password': [rules.required()],
}
