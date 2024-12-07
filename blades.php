<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AlphaController extends Controller
{
    // Home page
    public function index()
    {
        // Passing an array of projects for dynamic content
        $projects = [
            'Project A' => 'Description of Project A',
            'Project B' => 'Description of Project B',
            'Project C' => 'Description of Project C',
        ];

        return view('alpha.index', compact('projects'));
    }

    // About page
    public function about()
    {
        return view('alpha.about');
    }
}
