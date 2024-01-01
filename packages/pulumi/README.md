_Simple Pulumi orchestration like any build-system_

## Idea

Normally, pulumi expects you to create a package that only contains deployment details. While this is a valid use-case,
to integrate into development further you usually want to re-use that packages in a modular way. This is my take on this
modular way, where I try to replicate the same concepts that most build-systems follow with a modular configuration and
plugin ecosystem.

## Provides

- Everything from `@pulumi/pulumi`
- `@pulumi/kubernetes` as `k8s`
- `@pulumi/random` as `random`
- Define Configuration method

## Usage

1. Install the package: `yarn add -D @adaliszk/pulumi @pulumi/pulumi`
   (pulumi is needed because the CLI expects it within the package.json)
2. Create your configuration file `pulumi.config.ts`:
   ```typescript
   import { defineConfig } from '@adaliszk/pulumi'

   export default defineConfig({
       createNamespace: true, // or use string for a specific name
       resources: [
           // List your resources that implements `Component`
       ],
   })
   ```
3. Create Pulumi configuration file: `Pulumi.yaml`
   ```yaml
   name: your-distribution
   description: >-
     An example pulumi distribution using @adaliszk configuration

   main: pulumi.config.ts
   runtime: nodejs
   ```
4. Use the Pulumi CLI: `pulumi up`

## Adding Resources

To define new resources for the system, you can build a project that exports out the appropriate
function that implements the `Component` type. This wrapper function then needs to give back another
that then have access to the deployment configuration such as the created namespace.

Example:

```typescript
import { Component, ComponentDeployment, StackConfig } from '@adaliszk/pulumi'

export interface MyResourceOptions
{
    // Add your configuration
}

export const myResource: Component = (options?: MyResourceOptions) =>
{
    return (config: StackConfig) =>
    {
        // Create your resources
        // Return an object for exporting
    }
}
```

Ideally you should build this package, so that pulumi would need less compilation. For that, I recommend using `tsup`!

## Versioning

Since this is a meta-package, the versioning reflect its main provided package, in this case `@pulumi/pulumi`. However,
only the Major and Minor versions are kept in sync, and the Patch is used to bump the meta-package.
