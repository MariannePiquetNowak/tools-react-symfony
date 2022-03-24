<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CategoriesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoriesRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:id","read:name","read:slug", "write:id", "write:name", "write:slug"]],
    denormalizationContext: ["groups" => ["write:id", "write:name", "write:slug"]],
    collectionOperations: [
        'get', 
        'post' 
    ],
    itemOperations: [
        'get', 
        'patch' => ["groups" => [
            "write:name",
            "write:slug"
        ]], 
        'delete']
)]
class Categories
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:id", "write:id"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["write:name", "read:name"])]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:slug", "write:slug"])]
    private $slug;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }


    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }
}
