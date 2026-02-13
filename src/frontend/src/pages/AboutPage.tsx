import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold">About Daily News</h1>

          <Card className="mb-8">
            <CardContent className="prose prose-lg max-w-none p-8">
              <p className="text-lg leading-relaxed">
                Welcome to Daily News, your trusted source for the latest updates from around the globe. Founded
                and managed by Meesam Abbas, our mission is to provide accurate, reliable, and timely news that
                keeps you informed.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  To deliver unbiased, comprehensive news coverage that empowers our readers to make informed
                  decisions and stay connected with the world around them.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold">Our Vision</h2>
                <p className="text-muted-foreground">
                  To become the leading digital news platform that sets the standard for journalistic integrity,
                  innovation, and reader engagement in the modern media landscape.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold">Our Team</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Meesam Abbas</h3>
                  <p className="text-sm text-muted-foreground">Founder & Editor-in-Chief</p>
                  <p className="mt-2 text-muted-foreground">
                    Leading Daily News with a passion for quality journalism and commitment to truth.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
