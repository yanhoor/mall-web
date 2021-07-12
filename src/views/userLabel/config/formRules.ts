import rules from '@/config/rules'

export default {
    'name': [rules.required(), rules.limit(2, 5)],
    'color': [rules.required()],
}
