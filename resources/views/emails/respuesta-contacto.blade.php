<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Respuesta a su consulta - Sillas</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f7f6; padding: 40px 20px; margin: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border-top: 6px solid #01c38e;">
        
        <!-- Logotipo -->
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="{{ asset('images/logo.png') }}" alt="Sillas Logo" style="max-height: 60px; width: auto;">
        </div>

        <h2 style="color: #132d46; font-size: 22px; margin-bottom: 20px; text-align: center;">Hola {{ $mensaje->nombre }},</h2>
        
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
            Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje:
        </p>
        
        <blockquote style="background-color: #f0f4f8; border-left: 4px solid #01c38e; padding: 15px; margin: 20px 0; color: #666; font-style: italic;">
            "{{ $mensaje->mensaje }}"
        </blockquote>

        <p style="color: #555; line-height: 1.6; font-size: 16px; margin-top: 30px;">
            <strong>Nuestra respuesta:</strong>
        </p>
        
        <div style="background-color: #ffffff; border: 1px solid #e1e8ed; padding: 20px; border-radius: 8px; margin: 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
            {!! nl2br(e($respuesta)) !!}
        </div>

        <p style="color: #777; font-size: 14px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            Saludos cordiales,<br>
            <strong>El equipo de Sillas Premium</strong>
        </p>
    </div>
</body>
</html>
