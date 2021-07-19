import rules from '@/config/rules'

export default {
    'name': [rules.required()],
    'contract': [rules.required(), rules.mobile()],
    'shop_category_id': [rules.required()],
    'desc': [rules.required()],
    // 'opening_start': [rules.required()],
    // 'opening_end': [rules.required()],
    'timeRange': [rules.required()],
    'avatar': [rules.required()],
    'business_license': [rules.required()],
    'service_permission': [rules.required()],
    'provinceCode': [rules.required()],
    'cityCode': [rules.required()],
    'countyCode': [rules.required()],
    'townCode': [rules.required()],
    'codeList': [rules.required()],
    'tailAddress': [rules.required()],
}
