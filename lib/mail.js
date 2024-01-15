"use server"

import nodemailer from "nodemailer"
import * as handlebars from "handlebars"
import { registerTemplate } from "./templates/register";
import { forgotPasswordTemplate } from "./templates/forgotPassword";
import { testimonialTemplate } from "./templates/testimonial";

export async function sendMail({to, name, subject, body}) {
    const {NEXT_PUBLIC_SMTP_PASSWORD, NEXT_PUBLIC_SMTP_EMAIL} = process.env;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: NEXT_PUBLIC_SMTP_EMAIL,
            pass: NEXT_PUBLIC_SMTP_PASSWORD
        }
    });

    try {
        const testResult = await transport.verify();
    } catch (error) {
        console.log("Error test result", error);
        
        return;
    }

    try {
        const sendResult = await transport.sendMail({
            from: NEXT_PUBLIC_SMTP_EMAIL, to, subject, html: body
        });
    } catch (error) {
        console.log("Error send result", error);
    }
}

export async function compileRegisterTemplate(name, token) {
    const template = handlebars.compile(registerTemplate);
    const htmlBody = template({
        name,
        token
    });

    return(htmlBody);
}

export async function compileForgotPasswordTemplate(token) {
    const template = handlebars.compile(forgotPasswordTemplate);
    const htmlBody = template({
        token
    });

    return(htmlBody);
}

export async function compileTestimonialTemplate(name, phoneNumber, testimonial) {
    const template = handlebars.compile(testimonialTemplate);
    const htmlBody = template({
        name,
        phoneNumber,
        testimonial
    });

    return(htmlBody);
}