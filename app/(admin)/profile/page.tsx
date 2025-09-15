import { FormLayout } from "@/components/layout/form-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileUser() {
    return (
        <FormLayout>
            <form action="" className="space-y-3">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div>
                        <Input id="fullName" placeholder="Enter your full name"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="job">Job Title</Label>
                    <div>
                        <Input id="job" placeholder="Enter your job title"/>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <div>
                            <Input id="email" type="email" placeholder="Enter your email"/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">Your LinkedIn</Label>
                        <div>
                            <Input id="linkedin" type="url" placeholder="Enter your LinkedIn profile"/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="repository">Your Repository</Label>
                        <div>
                            <Input id="repository" type="url" placeholder="Enter your repository URL"/>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="about">About</Label>
                    <div>
                        <Textarea id="about" placeholder="Tell us about yourself"/>
                    </div>
                </div>
            </form>
        </FormLayout>
    )
}