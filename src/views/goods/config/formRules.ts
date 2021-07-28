import rules from '@/config/rules'

export default {
    'name': [rules.required()],
    'category_ids': [rules.required()],
    'pic_list': [rules.required()],
    'desc': [rules.required()],
    'sku_list': [rules.required()],
    'price': [rules.required()],
    'pack_fee': [rules.required()],
}
