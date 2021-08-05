import rules from '@/config/rules'

export default {
    'name': [rules.required()],
    'logo': [rules.required()],
    'img': [rules.required()],
    'link': [rules.required()],
    'color': [rules.required()],
}
