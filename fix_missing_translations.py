#!/usr/bin/env python3
import json
import os

# Translations for Benefits.secure and Features.f4
TRANSLATIONS = {
    "en": {
        "Benefits": {"secure": "Your images stay private"},
        "Features": {
            "f4_title": "Your Images Stay Safe",
            "f4_desc": "We never store your images. After optimization, files go directly back to your WordPress — no copies kept on our servers."
        }
    },
    "id": {
        "Benefits": {"secure": "Gambar Anda tetap aman"},
        "Features": {
            "f4_title": "Gambar Anda Tetap Aman",
            "f4_desc": "Kami tidak menyimpan gambar Anda. Setelah dioptimasi, file langsung dikirim kembali ke WordPress Anda — tidak ada salinan di server kami."
        }
    },
    "zh": {
        "Benefits": {"secure": "您的图片保持私密"},
        "Features": {
            "f4_title": "您的图片安全无忧",
            "f4_desc": "我们从不存储您的图片。优化后，文件直接返回您的WordPress——我们的服务器不保留任何副本。"
        }
    },
    "ja": {
        "Benefits": {"secure": "画像は安全に保護"},
        "Features": {
            "f4_title": "画像は安全に保護されます",
            "f4_desc": "画像は保存しません。最適化後、ファイルはWordPressに直接戻ります——サーバーにコピーは残りません。"
        }
    },
    "ru": {
        "Benefits": {"secure": "Ваши изображения в безопасности"},
        "Features": {
            "f4_title": "Ваши изображения в безопасности",
            "f4_desc": "Мы не храним ваши изображения. После оптимизации файлы возвращаются в WordPress — копии не сохраняются."
        }
    },
    "es": {
        "Benefits": {"secure": "Tus imágenes permanecen privadas"},
        "Features": {
            "f4_title": "Tus imágenes están seguras",
            "f4_desc": "Nunca almacenamos tus imágenes. Después de la optimización, los archivos vuelven a tu WordPress — sin copias en nuestros servidores."
        }
    },
    "fr": {
        "Benefits": {"secure": "Vos images restent privées"},
        "Features": {
            "f4_title": "Vos images sont en sécurité",
            "f4_desc": "Nous ne stockons jamais vos images. Après optimisation, les fichiers retournent à votre WordPress — aucune copie sur nos serveurs."
        }
    },
    "de": {
        "Benefits": {"secure": "Ihre Bilder bleiben privat"},
        "Features": {
            "f4_title": "Ihre Bilder sind sicher",
            "f4_desc": "Wir speichern Ihre Bilder nie. Nach der Optimierung gehen die Dateien direkt an Ihr WordPress zurück — keine Kopien auf unseren Servern."
        }
    },
    "pt": {
        "Benefits": {"secure": "Suas imagens permanecem privadas"},
        "Features": {
            "f4_title": "Suas imagens estão seguras",
            "f4_desc": "Nunca armazenamos suas imagens. Após a otimização, os arquivos voltam ao seu WordPress — sem cópias em nossos servidores."
        }
    },
    "ar": {
        "Benefits": {"secure": "صورك تبقى خاصة"},
        "Features": {
            "f4_title": "صورك في أمان",
            "f4_desc": "لا نخزن صورك أبداً. بعد التحسين، تعود الملفات مباشرة إلى WordPress الخاص بك — لا نسخ على خوادمنا."
        }
    },
    "hi": {
        "Benefits": {"secure": "आपकी छवियां निजी रहती हैं"},
        "Features": {
            "f4_title": "आपकी छवियां सुरक्षित हैं",
            "f4_desc": "हम कभी आपकी छवियां संग्रहीत नहीं करते। अनुकूलन के बाद, फाइलें सीधे आपके WordPress पर वापस जाती हैं — हमारे सर्वर पर कोई प्रतियां नहीं।"
        }
    },
    "ko": {
        "Benefits": {"secure": "이미지가 안전하게 보호됩니다"},
        "Features": {
            "f4_title": "이미지가 안전합니다",
            "f4_desc": "이미지를 저장하지 않습니다. 최적화 후 파일은 WordPress로 직접 반환됩니다 — 서버에 사본이 남지 않습니다."
        }
    },
    "it": {
        "Benefits": {"secure": "Le tue immagini restano private"},
        "Features": {
            "f4_title": "Le tue immagini sono al sicuro",
            "f4_desc": "Non memorizziamo mai le tue immagini. Dopo l'ottimizzazione, i file tornano al tuo WordPress — nessuna copia sui nostri server."
        }
    },
    "nl": {
        "Benefits": {"secure": "Je afbeeldingen blijven privé"},
        "Features": {
            "f4_title": "Je afbeeldingen zijn veilig",
            "f4_desc": "We slaan je afbeeldingen nooit op. Na optimalisatie gaan bestanden direct terug naar je WordPress — geen kopieën op onze servers."
        }
    },
    "pl": {
        "Benefits": {"secure": "Twoje obrazy pozostają prywatne"},
        "Features": {
            "f4_title": "Twoje obrazy są bezpieczne",
            "f4_desc": "Nigdy nie przechowujemy Twoich obrazów. Po optymalizacji pliki wracają do WordPress — bez kopii na naszych serwerach."
        }
    },
    "tr": {
        "Benefits": {"secure": "Görselleriniz gizli kalır"},
        "Features": {
            "f4_title": "Görselleriniz güvende",
            "f4_desc": "Görsellerinizi asla saklamıyoruz. Optimizasyondan sonra dosyalar WordPress'e geri döner — sunucularımızda kopya kalmaz."
        }
    },
    "vi": {
        "Benefits": {"secure": "Hình ảnh của bạn được bảo mật"},
        "Features": {
            "f4_title": "Hình ảnh của bạn được an toàn",
            "f4_desc": "Chúng tôi không bao giờ lưu trữ hình ảnh của bạn. Sau khi tối ưu, tệp trở về WordPress của bạn — không có bản sao trên máy chủ của chúng tôi."
        }
    },
    "th": {
        "Benefits": {"secure": "รูปภาพของคุณยังคงเป็นส่วนตัว"},
        "Features": {
            "f4_title": "รูปภาพของคุณปลอดภัย",
            "f4_desc": "เราไม่เก็บรูปภาพของคุณ หลังจากการเพิ่มประสิทธิภาพ ไฟล์จะกลับไปยัง WordPress ของคุณโดยตรง — ไม่มีสำเนาบนเซิร์ฟเวอร์ของเรา"
        }
    }
}

def update_locale_file(locale, messages_dir):
    filepath = os.path.join(messages_dir, f"{locale}.json")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    trans = TRANSLATIONS.get(locale, TRANSLATIONS["en"])
    
    # Update Benefits.secure
    if "Benefits" in data:
        data["Benefits"]["secure"] = trans["Benefits"]["secure"]
    
    # Update Features.f4_title and f4_desc
    if "Features" in data:
        data["Features"]["f4_title"] = trans["Features"]["f4_title"]
        data["Features"]["f4_desc"] = trans["Features"]["f4_desc"]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    
    print(f"  {locale}: Updated")

if __name__ == "__main__":
    messages_dir = "/Users/ariefjr/Documents/hermoves-id/wordpres-plugins/smallpict.tuxnoob.com/src/messages"
    
    locales = ['en', 'id', 'zh', 'ja', 'ru', 'es', 'fr', 'de', 'pt', 'ar', 'hi', 'ko', 'it', 'nl', 'pl', 'tr', 'vi', 'th']
    
    print("Adding Benefits.secure and Features.f4 translations...")
    for locale in locales:
        update_locale_file(locale, messages_dir)
    print("Done!")
