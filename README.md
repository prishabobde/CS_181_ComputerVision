## CS 181: Computer Vision Projects

These projects include an implementation of core computer vision algorithms, developed from first principles with an emphasis on mathematical rigor, multi-scale analysis, and geometric reasoning. The work spans feature detection, scale-space theory, image matching, motion estimation, and projective geometry, culminating in a full pipeline for understanding and transforming visual data.

---

### Tech Stack

* **Python** for algorithm development and experimentation
* **NumPy** for vectorized numerical computation and linear algebra
* **OpenCV (cv2)** for image processing operations and validation (e.g., homography)
* **SciPy** (`ndimage`, `signal`) for convolution, filtering, and gradient computation
* **Matplotlib** for visualization of intermediate outputs (pyramids, keypoints, flow fields)
* **Google Colab** for interactive prototyping and visual debugging

---

###  Algorithms & Concepts

* **Multi-Scale Image Representations**

  * Constructed **Gaussian and Laplacian pyramids** for hierarchical image representation
  * Implemented downsampling, smoothing, and reconstruction techniques
  * Demonstrated how scale affects feature visibility and detection

* **Feature Detection**

  * Implemented **Harris Corner Detector** using structure tensor and corner response function
  * Applied thresholding and ranking to extract strong, localized features
  * Extended to **multi-scale detection** using Gaussian smoothing

* **Blob Detection & Scale-Space Theory**

  * Implemented **Laplacian of Gaussian (LoG)** and **Difference of Gaussian (DoG)**
  * Detected scale-invariant keypoints via local extrema across space and scale
  * Evaluated robustness under transformations (e.g., rotation invariance experiments)

* **SIFT (Scale-Invariant Feature Transform) Pipeline**

  * Built **Gaussian and DoG pyramids across octaves**
  * Detected candidate keypoints via 3D scale-space extrema
  * Filtered unstable points using:

    * Low-contrast thresholding
    * Edge response elimination via **Hessian matrix eigenvalue ratio**
  * Assigned **dominant orientations** using weighted gradient histograms
  * Constructed **128-dimensional descriptors** (4×4×8 histograms)
  * Matched descriptors using distance metrics to establish correspondences between images

* **Feature Matching**

  * Implemented descriptor matching using **Manhattan distance**
  * Visualized correspondences with line connections across images
  * Demonstrated practical applications in alignment and object recognition

* **Optical Flow (Motion Estimation)**

  * Implemented **Lucas–Kanade method** for dense optical flow
  * Computed spatial and temporal gradients using Sobel filters
  * Solved local least-squares systems via structure tensors
  * Filtered unreliable estimates using **eigenvalue analysis**
  * Visualized motion using quiver plots and reliability heatmaps

* **Projective Geometry & Homography**

  * Implemented **Direct Linear Transform (DLT)** for homography estimation
  * Solved linear systems using **SVD** to compute projective mappings
  * Applied homographies for:

    * Perspective correction
    * Image warping and synthesis
    * Cross-view image mapping
  * Compared manual implementation with OpenCV for validation

* **Normalization in DLT**

  * Improved numerical stability via:

    * Centroid translation
    * Scaling to average distance √2
  * Demonstrated large accuracy gains between **unnormalized vs normalized DLT**

* **Epipolar Geometry**

  * Implemented **8-point algorithm** to compute the **fundamental matrix**
  * Enforced rank-2 constraint via SVD
  * Generated and visualized **epipolar lines** across stereo image pairs
  * Demonstrated geometric constraints between corresponding points in two views

---

### Technical Highlights

* End-to-end implementation of classical vision pipelines **without relying on high-level APIs**
* Heavy use of **linear algebra (SVD, eigenvalues, least squares)** for geometric estimation
* Integration of **scale-space theory** with feature detection and description
* Careful handling of **numerical stability** (normalization, conditioning, thresholding)
* Extensive visualization for debugging and interpretability of intermediate representations
* Modular implementations enabling reuse across tasks (e.g., pyramids, gradients, descriptors)


