import nodemailer from 'nodemailer';
import { promises as fs } from "fs";
import _ from 'lodash';
import environment from '../environments/environment'

interface TemplateValues { }

export interface Mail {
    from: string;
    to: string;
    subject: string;
    templatePath: string;
    templateValues: TemplateValues;
}

export class Mailer {
    private static instance: Mailer
    private constructor() { }

    public static getInstance(): Mailer {
        if (!Mailer.instance) {
            Mailer.instance = new Mailer
        }
        return Mailer.instance
    }

    private static async replaceTemplateValues(content: string, templateValues: TemplateValues): Promise<string> {
        let convertedContent = content;
        _.forEach(templateValues, (value, key) => {
            convertedContent = _.replace(convertedContent, new RegExp(`{${key}}`, 'g'), value);
        });
        return convertedContent;
    }

    public async sendMail(mail: Mail) {
        try {
            let html = await fs.readFile(mail.templatePath, { encoding: 'utf-8' })
            let renderedHtml = await Mailer.replaceTemplateValues(html, mail.templateValues);
            let transporter = nodemailer.createTransport(environment.smtp);
            let mailOptions = {
                from: mail.from,
                to: mail.to,
                subject: mail.subject,
                html: renderedHtml
            }
            await transporter.sendMail(mailOptions)
        } catch (error) {
            throw error;
        }

    }
}