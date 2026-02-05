#!/usr/bin/env python3
import json
import os

# Translations for Privacy and Terms in all languages
TRANSLATIONS = {
    "zh": {
        "Privacy": {
            "title": "隐私政策",
            "lastUpdated": "最后更新：2026年2月",
            "s1_title": "1. 简介",
            "s1_content": "SmallPict尊重您的隐私，并致力于保护您的个人数据。本隐私政策解释了当您使用我们的WordPress图片优化服务时，我们如何收集、使用和保护您的信息。",
            "s2_title": "2. 我们收集的数据",
            "s2_content": "我们收集以下类型的信息：",
            "s2_item1": "账户信息：激活插件时的电子邮件地址和网站URL。",
            "s2_item2": "使用数据：处理的图片数量、文件大小和优化统计。",
            "s2_item3": "技术数据：WordPress版本、PHP版本和插件版本用于兼容性。",
            "s3_title": "3. 图片处理与存储",
            "s3_content": "我们不存储您的图片。当您通过我们的服务上传图片时：",
            "s3_item1": "您的图片在我们安全的云基础设施中临时处理。",
            "s3_item2": "优化后的图片立即发送回您的WordPress网站。",
            "s3_item3": "原始版本和优化版本在几分钟内从我们的服务器删除。",
            "s3_item4": "我们不保留您图片的任何副本。",
            "s4_title": "4. 数据安全",
            "s4_content": "我们实施行业标准安全措施，包括传输加密（HTTPS/TLS）、安全云基础设施和定期安全审计来保护您的数据。",
            "s5_title": "5. 您的权利",
            "s5_content": "您有权访问、更正或删除您的个人数据。如有数据相关请求，请联系privacy@tuxnoob.com。",
            "s6_title": "6. 联系我们",
            "s6_content": "如有关于本隐私政策的问题，请联系：privacy@tuxnoob.com"
        },
        "Terms": {
            "title": "服务条款",
            "lastUpdated": "最后更新：2026年2月",
            "s1_title": "1. 条款接受",
            "s1_content": "使用SmallPict即表示您同意受这些服务条款的约束。如不同意这些条款，请勿使用我们的服务。",
            "s2_title": "2. 服务描述",
            "s2_content": "SmallPict是WordPress的云端图片优化服务。我们提供自动压缩和格式转换（WebP、AVIF）来帮助提升您网站的性能。",
            "s3_title": "3. 使用限制与合理使用",
            "s3_content": "每个订阅计划包含月度图片处理配额：",
            "s3_item1": "免费版：有限的月度配额用于个人/测试使用。",
            "s3_item2": "付费版：根据您的订阅级别获得更高配额。",
            "s3_item3": "超出配额的使用将排队至下一个计费周期。",
            "s4_title": "4. 付款与退款",
            "s4_content": "付款通过Freemius安全处理。除非取消，订阅将自动续订。首次购买提供14天退款保证。",
            "s5_title": "5. 服务可用性",
            "s5_content": "我们努力达到99.9%的正常运行时间，但不保证服务不中断。计划维护将尽可能提前通知。",
            "s6_title": "6. 联系方式",
            "s6_content": "如有关于这些服务条款的问题，请联系：support@tuxnoob.com"
        },
        "Footer": {
            "privacy": "隐私政策",
            "terms": "服务条款",
            "docs": "文档",
            "contact": "联系我们"
        }
    },
    "ja": {
        "Privacy": {
            "title": "プライバシーポリシー",
            "lastUpdated": "最終更新：2026年2月",
            "s1_title": "1. はじめに",
            "s1_content": "SmallPictはお客様のプライバシーを尊重し、個人データの保護に努めています。このプライバシーポリシーは、WordPress画像最適化サービスをご利用の際に、どのように情報を収集、使用、保護するかを説明します。",
            "s2_title": "2. 収集するデータ",
            "s2_content": "以下の種類の情報を収集します：",
            "s2_item1": "アカウント情報：プラグイン有効化時のメールアドレスとウェブサイトURL。",
            "s2_item2": "利用データ：処理した画像数、ファイルサイズ、最適化統計。",
            "s2_item3": "技術データ：互換性のためのWordPressバージョン、PHPバージョン、プラグインバージョン。",
            "s3_title": "3. 画像処理と保存",
            "s3_content": "お客様の画像は保存しません。サービスを通じて画像をアップロードする際：",
            "s3_item1": "画像は安全なクラウドインフラで一時的に処理されます。",
            "s3_item2": "最適化された画像は即座にWordPressサイトに送り返されます。",
            "s3_item3": "オリジナルと最適化版は数分以内にサーバーから削除されます。",
            "s3_item4": "画像のコピーは一切保持しません。",
            "s4_title": "4. データセキュリティ",
            "s4_content": "転送時暗号化（HTTPS/TLS）、安全なクラウドインフラ、定期的なセキュリティ監査など、業界標準のセキュリティ対策を実施しています。",
            "s5_title": "5. お客様の権利",
            "s5_content": "個人データへのアクセス、訂正、削除の権利があります。データ関連のリクエストはprivacy@tuxnoob.comまでご連絡ください。",
            "s6_title": "6. お問い合わせ",
            "s6_content": "このプライバシーポリシーに関するご質問は：privacy@tuxnoob.com"
        },
        "Terms": {
            "title": "利用規約",
            "lastUpdated": "最終更新：2026年2月",
            "s1_title": "1. 規約の承諾",
            "s1_content": "SmallPictを使用することで、これらの利用規約に拘束されることに同意したものとします。これらの規約に同意しない場合は、サービスをご利用にならないでください。",
            "s2_title": "2. サービスの説明",
            "s2_content": "SmallPictはWordPress向けのクラウドベース画像最適化サービスです。ウェブサイトのパフォーマンス向上のため、自動圧縮とフォーマット変換（WebP、AVIF）を提供します。",
            "s3_title": "3. 使用制限と公正利用",
            "s3_content": "各サブスクリプションプランには月間画像処理クォータが含まれます：",
            "s3_item1": "無料版：個人/テスト用の限定月間クォータ。",
            "s3_item2": "有料版：サブスクリプションレベルに応じた高いクォータ。",
            "s3_item3": "クォータを超えた使用は次の請求サイクルまでキューに入れられます。",
            "s4_title": "4. 支払いと返金",
            "s4_content": "支払いはFreemiusを通じて安全に処理されます。キャンセルしない限り、サブスクリプションは自動更新されます。初回購入には14日間の返金保証があります。",
            "s5_title": "5. サービスの可用性",
            "s5_content": "99.9%のアップタイムを目指していますが、中断のないサービスを保証するものではありません。計画されたメンテナンスは可能な限り事前に通知します。",
            "s6_title": "6. お問い合わせ",
            "s6_content": "これらの利用規約に関するご質問は：support@tuxnoob.com"
        },
        "Footer": {
            "privacy": "プライバシーポリシー",
            "terms": "利用規約",
            "docs": "ドキュメント",
            "contact": "お問い合わせ"
        }
    }
}

# Simple fallback for other languages - use English with translated titles
FALLBACK = {
    "ru": {"Privacy": {"title": "Политика конфиденциальности"}, "Terms": {"title": "Условия использования"}, "Footer": {"privacy": "Конфиденциальность", "terms": "Условия", "docs": "Документация", "contact": "Контакт"}},
    "es": {"Privacy": {"title": "Política de Privacidad"}, "Terms": {"title": "Términos de Servicio"}, "Footer": {"privacy": "Privacidad", "terms": "Términos", "docs": "Documentación", "contact": "Contacto"}},
    "fr": {"Privacy": {"title": "Politique de Confidentialité"}, "Terms": {"title": "Conditions d'Utilisation"}, "Footer": {"privacy": "Confidentialité", "terms": "Conditions", "docs": "Documentation", "contact": "Contact"}},
    "de": {"Privacy": {"title": "Datenschutzrichtlinie"}, "Terms": {"title": "Nutzungsbedingungen"}, "Footer": {"privacy": "Datenschutz", "terms": "Nutzungsbedingungen", "docs": "Dokumentation", "contact": "Kontakt"}},
    "pt": {"Privacy": {"title": "Política de Privacidade"}, "Terms": {"title": "Termos de Serviço"}, "Footer": {"privacy": "Privacidade", "terms": "Termos", "docs": "Documentação", "contact": "Contato"}},
    "ar": {"Privacy": {"title": "سياسة الخصوصية"}, "Terms": {"title": "شروط الخدمة"}, "Footer": {"privacy": "الخصوصية", "terms": "الشروط", "docs": "التوثيق", "contact": "اتصل بنا"}},
    "hi": {"Privacy": {"title": "गोपनीयता नीति"}, "Terms": {"title": "सेवा की शर्तें"}, "Footer": {"privacy": "गोपनीयता", "terms": "शर्तें", "docs": "दस्तावेज़", "contact": "संपर्क"}},
    "ko": {"Privacy": {"title": "개인정보 보호정책"}, "Terms": {"title": "서비스 약관"}, "Footer": {"privacy": "개인정보", "terms": "약관", "docs": "문서", "contact": "연락처"}},
    "it": {"Privacy": {"title": "Informativa sulla Privacy"}, "Terms": {"title": "Termini di Servizio"}, "Footer": {"privacy": "Privacy", "terms": "Termini", "docs": "Documentazione", "contact": "Contatto"}},
    "nl": {"Privacy": {"title": "Privacybeleid"}, "Terms": {"title": "Servicevoorwaarden"}, "Footer": {"privacy": "Privacy", "terms": "Voorwaarden", "docs": "Documentatie", "contact": "Contact"}},
    "pl": {"Privacy": {"title": "Polityka Prywatności"}, "Terms": {"title": "Warunki Usługi"}, "Footer": {"privacy": "Prywatność", "terms": "Warunki", "docs": "Dokumentacja", "contact": "Kontakt"}},
    "tr": {"Privacy": {"title": "Gizlilik Politikası"}, "Terms": {"title": "Hizmet Şartları"}, "Footer": {"privacy": "Gizlilik", "terms": "Şartlar", "docs": "Belgeler", "contact": "İletişim"}},
    "vi": {"Privacy": {"title": "Chính sách Bảo mật"}, "Terms": {"title": "Điều khoản Dịch vụ"}, "Footer": {"privacy": "Bảo mật", "terms": "Điều khoản", "docs": "Tài liệu", "contact": "Liên hệ"}},
    "th": {"Privacy": {"title": "นโยบายความเป็นส่วนตัว"}, "Terms": {"title": "ข้อกำหนดการให้บริการ"}, "Footer": {"privacy": "ความเป็นส่วนตัว", "terms": "ข้อกำหนด", "docs": "เอกสาร", "contact": "ติดต่อ"}},
}

# English base for fallback
EN_BASE = {
    "Privacy": {
        "title": "Privacy Policy",
        "lastUpdated": "Last updated: February 2026",
        "s1_title": "1. Introduction",
        "s1_content": "SmallPict respects your privacy and is committed to protecting your personal data.",
        "s2_title": "2. Data We Collect",
        "s2_content": "We collect the following types of information:",
        "s2_item1": "Account Information: Email address and website URL when you activate the plugin.",
        "s2_item2": "Usage Data: Number of images processed, file sizes, and optimization statistics.",
        "s2_item3": "Technical Data: WordPress version, PHP version, and plugin version.",
        "s3_title": "3. Image Processing & Storage",
        "s3_content": "We do NOT store your images. When you upload an image:",
        "s3_item1": "Your image is temporarily processed in our secure cloud.",
        "s3_item2": "The optimized image is immediately sent back to your WordPress.",
        "s3_item3": "Both versions are deleted from our servers within minutes.",
        "s3_item4": "We do not keep any copies of your images.",
        "s4_title": "4. Data Security",
        "s4_content": "We implement industry-standard security measures including HTTPS/TLS encryption.",
        "s5_title": "5. Your Rights",
        "s5_content": "You have the right to access, correct, or delete your personal data. Contact: privacy@tuxnoob.com",
        "s6_title": "6. Contact Us",
        "s6_content": "For questions about this Privacy Policy: privacy@tuxnoob.com"
    },
    "Terms": {
        "title": "Terms of Service",
        "lastUpdated": "Last updated: February 2026",
        "s1_title": "1. Acceptance of Terms",
        "s1_content": "By using SmallPict, you agree to be bound by these Terms of Service.",
        "s2_title": "2. Description of Service",
        "s2_content": "SmallPict is a cloud-based image optimization service for WordPress.",
        "s3_title": "3. Usage Limits & Fair Use",
        "s3_content": "Each subscription plan includes a monthly image processing quota:",
        "s3_item1": "Free tier: Limited monthly quota for personal/testing use.",
        "s3_item2": "Paid tiers: Higher quotas based on your subscription level.",
        "s3_item3": "Usage beyond quota will be queued until the next billing cycle.",
        "s4_title": "4. Payment & Refunds",
        "s4_content": "Payments are processed securely through Freemius. 14-day money-back guarantee.",
        "s5_title": "5. Service Availability",
        "s5_content": "We strive for 99.9% uptime but do not guarantee uninterrupted service.",
        "s6_title": "6. Contact",
        "s6_content": "For questions about these Terms: support@tuxnoob.com"
    }
}

def update_locale_file(locale, messages_dir):
    filepath = os.path.join(messages_dir, f"{locale}.json")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Check if Privacy already exists
    if "Privacy" in data and "Terms" in data:
        print(f"  {locale}: Already has Privacy/Terms, skipping")
        return
    
    # Get translations
    if locale in TRANSLATIONS:
        trans = TRANSLATIONS[locale]
    elif locale in FALLBACK:
        trans = {
            "Privacy": {**EN_BASE["Privacy"], **FALLBACK[locale].get("Privacy", {})},
            "Terms": {**EN_BASE["Terms"], **FALLBACK[locale].get("Terms", {})},
        }
    else:
        print(f"  {locale}: No translation available")
        return
    
    # Update Footer with new keys
    if "Footer" in data:
        footer_trans = trans.get("Footer", FALLBACK.get(locale, {}).get("Footer", {}))
        if footer_trans:
            data["Footer"].update(footer_trans)
    
    # Add Privacy and Terms
    data["Privacy"] = trans["Privacy"]
    data["Terms"] = trans["Terms"]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    
    print(f"  {locale}: Updated successfully")

if __name__ == "__main__":
    messages_dir = "/Users/ariefjr/Documents/hermoves-id/wordpres-plugins/smallpict.tuxnoob.com/src/messages"
    
    locales = ['zh', 'ja', 'ru', 'es', 'fr', 'de', 'pt', 'ar', 'hi', 'ko', 'it', 'nl', 'pl', 'tr', 'vi', 'th']
    
    print("Updating locale files with Privacy/Terms translations...")
    for locale in locales:
        update_locale_file(locale, messages_dir)
    print("Done!")
