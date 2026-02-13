import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

          <Card className="mb-8">
            <CardContent className="prose prose-lg max-w-none p-8">
              <p className="text-lg leading-relaxed">
                At Daily News, your privacy is important to us. We collect minimal personal data such as emails
                for login/signup and newsletter subscriptions. Your information will never be sold or shared with
                third parties. By using our website, you agree to our privacy practices.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold">Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies to enhance your browsing experience and remember your preferences. These cookies
                  are essential for the website to function properly and do not collect personal information
                  without your consent.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold">Data Protection</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures to protect your personal information from
                  unauthorized access, disclosure, or misuse. Your data is stored securely and accessed only by
                  authorized personnel.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold">Third-party Links</h2>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party websites. We are not responsible for the privacy
                  practices or content of these external sites. We encourage you to review their privacy policies
                  before providing any personal information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
