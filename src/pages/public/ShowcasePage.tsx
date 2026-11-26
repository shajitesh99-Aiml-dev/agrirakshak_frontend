import React, { useState } from 'react';
import {
  Sprout,
  Eye,
  Sliders,
  Bell,
  Home,
  FileText,
  User,
  Settings,
  MoreVertical,
  Trash2,
  Share2,
  Info,
  Bug,
  LayoutGrid,
} from 'lucide-react';
import {
  Button,
  IconButton,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Container,
  Display,
  PageTitle,
  SectionHeading,
  Subheading,
  BodyText,
  SmallText,
  Label,
  HelperText,
  Caption,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  Badge,
  Alert,
  Dialog,
  DropdownMenu,
  Tooltip,
  Avatar,
  StatusIndicator,
  Progress,
  Spinner,
  Skeleton,
  EmptyState,
  ErrorState,
  SuccessState,
  FileUpload,
  SearchInput,
  Pagination,
  Tabs,
  TabList,
  TabTrigger,
  TabPanel,
  Breadcrumbs,
  Divider,
  MobileBottomNav,
} from '../../components/ui';
import { THEME_COLORS, SEMANTIC_COLORS } from '../../utils/tokens';
import { usePageTitle } from '../../hooks/usePageTitle';

export const ShowcasePage: React.FC = () => {
  usePageTitle('Agri Rakshak | UI Component Library Showcase');

  const [activeCategory, setActiveCategory] = useState<string>('buttons');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [formInputValue, setFormInputValue] = useState<string>('Nagpur Yellow Rust Sample');
  const [formInputError, setFormInputError] = useState<string>('');
  const [searchVal, setSearchVal] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [progressVal, setProgressVal] = useState<number>(65);
  const [switchChecked, setSwitchChecked] = useState<boolean>(true);
  const [selectedCrop, setSelectedCrop] = useState<string>('wheat');
  const [radioRole, setRadioRole] = useState<string>('farmer');
  const [checkboxConsent, setCheckboxConsent] = useState<boolean>(true);
  const [mobileNavActive, setMobileNavActive] = useState<string>('home');

  const cropOptions = [
    { value: 'wheat', label: 'Wheat (गेहूं)' },
    { value: 'rice', label: 'Rice / Paddy (धान)' },
    { value: 'cotton', label: 'Cotton (कपास)' },
    { value: 'tomato', label: 'Tomato (टमाटर)' },
    { value: 'mustard', label: 'Mustard (सरसों)' },
  ];

  const roleOptions = [
    { value: 'farmer', label: 'Farmer (किसान)', description: 'Report crop symptoms & receive AI diagnosis' },
    { value: 'officer', label: 'Agricultural Officer (कृषि अधिकारी)', description: 'Triage escalated cases & issue advisories' },
    { value: 'admin', label: 'Administrator', description: 'Monitor district trends & manage platform access' },
  ];

  const breadcrumbItems = [
    { label: 'Agri Rakshak', href: '#' },
    { label: 'Maharashtra', href: '#' },
    { label: 'Nashik District', href: '#' },
    { label: 'Case #2026-AR-892', isCurrent: true },
  ];

  const dropdownItems = [
    {
      label: 'View Crop Details',
      icon: <Eye className="w-4 h-4 text-primary" />,
      onClick: () => alert('Viewing crop details'),
    },
    {
      label: 'Share with Officer',
      icon: <Share2 className="w-4 h-4 text-ai" />,
      onClick: () => alert('Shared with Agricultural Officer'),
    },
    {
      label: 'Delete Report Draft',
      icon: <Trash2 className="w-4 h-4" />,
      destructive: true,
      onClick: () => alert('Draft report deleted'),
    },
  ];

  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" />, active: mobileNavActive === 'home', onClick: () => setMobileNavActive('home') },
    { id: 'report', label: 'New Case', icon: <Bug className="w-5 h-5" />, active: mobileNavActive === 'report', onClick: () => setMobileNavActive('report') },
    { id: 'cases', label: 'My Cases', icon: <FileText className="w-5 h-5" />, active: mobileNavActive === 'cases', onClick: () => setMobileNavActive('cases'), badge: 2 },
    { id: 'alerts', label: 'Advisories', icon: <Bell className="w-5 h-5" />, active: mobileNavActive === 'alerts', onClick: () => setMobileNavActive('alerts') },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" />, active: mobileNavActive === 'profile', onClick: () => setMobileNavActive('profile') },
  ];

  return (
    <div className="py-8 sm:py-12 font-serif pb-24 md:pb-12">
      <Container size="2xl">
        <div className="max-w-3xl mb-8">
          <Badge variant="default" className="mb-2">Phase 2 Validated Component Gallery</Badge>
          <PageTitle className="mb-2">
            Design System &amp; UI Components
          </PageTitle>
          <BodyText size="base" className="text-text-muted">
            All 34+ accessible primitives developed in Phase 2 for interactive inspection.
          </BodyText>
          <div className="mt-4">
            <Button variant="primary" size="sm" onClick={() => setIsDialogOpen(true)}>
              Open Test Dialog
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
          <TabList aria-label="Component Showcase Categories" className="mb-8 flex flex-wrap">
            <TabTrigger value="buttons" icon={<Sliders className="w-4 h-4" />}>
              Buttons &amp; Icons
            </TabTrigger>
            <TabTrigger value="cards" icon={<LayoutGrid className="w-4 h-4" />}>
              Cards &amp; Surfaces
            </TabTrigger>
            <TabTrigger value="forms" icon={<FileText className="w-4 h-4" />}>
              Form Controls
            </TabTrigger>
            <TabTrigger value="feedback" icon={<Bell className="w-4 h-4" />}>
              Feedback &amp; Status
            </TabTrigger>
            <TabTrigger value="states" icon={<Sprout className="w-4 h-4" />}>
              Empty / Error / Success
            </TabTrigger>
            <TabTrigger value="navigation" icon={<Home className="w-4 h-4" />}>
              Navigation &amp; Upload
            </TabTrigger>
            <TabTrigger value="typography" icon={<Info className="w-4 h-4" />}>
              Typography &amp; Tokens
            </TabTrigger>
          </TabList>

          {/* TAB 1: Buttons & Icons */}
          <TabPanel value="buttons">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>
                  Semantic action buttons with minimum 44px mobile touch targets, focus rings, and active states.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="accent">Accent Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                  <Button variant="primary" disabled>
                    Disabled Button
                  </Button>
                </div>

                <Divider label="Sizes & Loading States" />

                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" variant="primary">Small (36px)</Button>
                  <Button size="md" variant="primary">Medium (44px)</Button>
                  <Button size="lg" variant="primary">Large (48px)</Button>
                  <Button
                    variant="primary"
                    isLoading={btnLoading}
                    onClick={() => {
                      setBtnLoading(true);
                      setTimeout(() => setBtnLoading(false), 2000);
                    }}
                  >
                    {btnLoading ? 'Analyzing Crop...' : 'Click to Test Loading'}
                  </Button>
                </div>

                <Divider label="Accessible Icon Buttons with Tooltips" />

                <div className="flex flex-wrap items-center gap-4">
                  <IconButton
                    icon={<Sprout className="w-5 h-5" />}
                    aria-label="Crop Health Overview"
                    tooltip="Crop Health Overview"
                    variant="primary"
                  />
                  <IconButton
                    icon={<Bell className="w-5 h-5" />}
                    aria-label="Pest Alerts & Notifications"
                    tooltip="Pest Alerts & Notifications"
                    variant="secondary"
                  />
                  <IconButton
                    icon={<Settings className="w-5 h-5" />}
                    aria-label="Farmer Settings"
                    tooltip="Farmer Settings"
                    variant="outline"
                  />
                  <IconButton
                    icon={<Trash2 className="w-5 h-5" />}
                    aria-label="Delete Record"
                    tooltip="Delete Record"
                    variant="destructive"
                  />

                  <Tooltip content="Direct AI crop diagnostic tooltip" position="top">
                    <Button variant="ghost">Hover for Tooltip</Button>
                  </Tooltip>

                  <DropdownMenu
                    trigger={
                      <Button variant="outline" rightIcon={<MoreVertical className="w-4 h-4" />}>
                        Report Actions Menu
                      </Button>
                    }
                    items={dropdownItems}
                  />
                </div>
              </CardContent>
            </Card>
          </TabPanel>

          {/* TAB 2: Cards & Surfaces */}
          <TabPanel value="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="default">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Crisp white surface with subtle green-tinted border</CardDescription>
                </CardHeader>
                <CardContent>
                  <BodyText size="sm" className="text-text-muted">
                    Standard container for dashboard metrics and farmer logs.
                  </BodyText>
                </CardContent>
                <CardFooter>
                  <Badge variant="default">Default Surface</Badge>
                  <Button variant="ghost" size="sm">Details</Button>
                </CardFooter>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>Gentle elevation for prominent cards</CardDescription>
                </CardHeader>
                <CardContent>
                  <BodyText size="sm" className="text-text-muted">
                    Ideal for critical AI disease warnings and urgent review queues.
                  </BodyText>
                </CardContent>
                <CardFooter>
                  <Badge variant="warning">Elevated Shadow</Badge>
                  <Button variant="secondary" size="sm">Review</Button>
                </CardFooter>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Outlined Card</CardTitle>
                  <CardDescription>Distinct primary border highlight</CardDescription>
                </CardHeader>
                <CardContent>
                  <BodyText size="sm" className="text-text-muted">
                    Used for selected crop varieties or active triage tasks.
                  </BodyText>
                </CardContent>
                <CardFooter>
                  <Badge variant="info">Active Selection</Badge>
                </CardFooter>
              </Card>

              <Card variant="interactive" onClick={() => alert('Interactive Card Clicked!')}>
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>Hover &amp; focus elevation feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <BodyText size="sm" className="text-text-muted">
                    Clickable card surface for navigating directly to cases.
                  </BodyText>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-primary font-bold">Tap to open case →</span>
                </CardFooter>
              </Card>

              <Card variant="success">
                <CardHeader>
                  <CardTitle>Success Variant Card</CardTitle>
                  <CardDescription>Healthy crop status &amp; resolved cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <BodyText size="sm" className="text-semantic-success-text font-medium">
                    ✔ AI model detected no harmful pathogens in recent leaf photograph.
                  </BodyText>
                </CardContent>
                <CardFooter>
                  <StatusIndicator status="resolved" size="sm" />
                </CardFooter>
              </Card>

              <Card variant="warning">
                <CardHeader>
                  <CardTitle>Warning Variant Card</CardTitle>
                  <CardDescription>Potential fungal pathogen detected</CardDescription>
                </CardHeader>
                <CardContent>
                  <BodyText size="sm" className="text-semantic-warning-text font-medium">
                    ⚠ High humidity and leaf discoloration detected.
                  </BodyText>
                </CardContent>
                <CardFooter>
                  <StatusIndicator status="pending" size="sm" />
                </CardFooter>
              </Card>
            </div>
          </TabPanel>

          {/* TAB 3: Forms */}
          <TabPanel value="forms">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Text &amp; Selection Inputs</CardTitle>
                  <CardDescription>Semantic form inputs with accessible validation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <Input
                    label="Sample Identification / Title"
                    required
                    value={formInputValue}
                    onChange={(e) => setFormInputValue(e.target.value)}
                    helperText="Enter a brief identifier for the crop symptoms observed"
                    errorMessage={formInputError}
                  />

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setFormInputError(
                          formInputError ? '' : 'Title cannot be empty. Please specify the crop issue.'
                        )
                      }
                    >
                      Toggle Error Validation
                    </Button>
                  </div>

                  <Select
                    label="Primary Crop Type"
                    required
                    options={cropOptions}
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    helperText="Select the crop currently affected by pests or symptoms"
                  />

                  <SearchInput
                    label="Search Case Records"
                    placeholder="Search by farmer name, village, or disease..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    onClear={() => setSearchVal('')}
                  />

                  <Textarea
                    label="Detailed Symptom Observations"
                    placeholder="Describe leaf yellowing, stem holes, insect presence..."
                    rows={4}
                    showCount
                    maxLength={300}
                    helperText="Provide observations to aid AI disease confidence calculation"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Toggles &amp; Selection Groups</CardTitle>
                  <CardDescription>Accessible radio groups, switches, and checkboxes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    name="userRole"
                    label="User Role Selection"
                    required
                    options={roleOptions}
                    value={radioRole}
                    onChange={setRadioRole}
                    helperText="Determines access privileges and tailored view"
                  />

                  <Divider />

                  <div className="space-y-3">
                    <Label>Notification Preferences</Label>
                    <Switch
                      label="Instant SMS Advisory Alerts"
                      description="Receive vital pest outbreak updates directly via local SMS"
                      checked={switchChecked}
                      onChange={setSwitchChecked}
                    />
                  </div>

                  <Divider />

                  <div className="space-y-2">
                    <Label>Farmer Consent</Label>
                    <Checkbox
                      label="Share crop coordinates for regional epidemiology"
                      description="Enables Agricultural Officers to map pest clusters"
                      checked={checkboxConsent}
                      onChange={(e) => setCheckboxConsent(e.target.checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabPanel>

          {/* TAB 4: Feedback */}
          <TabPanel value="feedback">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Banners</CardTitle>
                  <CardDescription>Screen-reader accessible status alerts with dismissibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert variant="info" title="AI Model Version 2.4 Loaded" dismissible>
                    Trained on 45,000+ localized Indian crop leaf pathology images with 94.6% accuracy.
                  </Alert>

                  <Alert variant="success" title="Advisory Verified by Officer" dismissible>
                    District Agricultural Officer reviewed and confirmed the organic neem oil prescription.
                  </Alert>

                  <Alert variant="warning" title="Weather Advisory: High Fungal Spore Risk" dismissible>
                    Heavy rain forecast over the next 48 hours will accelerate spore proliferation.
                  </Alert>

                  <Alert variant="error" title="Critical Pest Infestation Escalation" dismissible>
                    Fall Armyworm spotted in 4 neighboring farms. Emergency containment protocol activated.
                  </Alert>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Semantic Badges</CardTitle>
                    <CardDescription>Categorization tokens with color contrast and optional dots</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default" showDot>Default</Badge>
                      <Badge variant="success" showDot>Resolved</Badge>
                      <Badge variant="warning" showDot>Moderate Risk</Badge>
                      <Badge variant="error" showDot>High Risk</Badge>
                      <Badge variant="info" showDot>AI Prediction</Badge>
                      <Badge variant="neutral" showDot>Archived</Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="success" size="sm">Expert Verified</Badge>
                      <Badge variant="info" size="sm">98.2% Confidence</Badge>
                      <Badge variant="error" size="sm">Critical Severity</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Case Status Indicators</CardTitle>
                    <CardDescription>
                      Multimodal status elements displaying icon, dot, and descriptive text
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2.5">
                      <StatusIndicator status="pending" />
                      <StatusIndicator status="analyzing" />
                      <StatusIndicator status="resolved" />
                      <StatusIndicator status="escalated" />
                      <StatusIndicator status="verified" />
                      <StatusIndicator status="rejected" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Progress &amp; Loading Spinners</CardTitle>
                  <CardDescription>Visual feedback during image analysis and file uploads</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 max-w-lg">
                    <Progress
                      value={progressVal}
                      showValue
                      label="AI Model Inference Pipeline"
                      variant="primary"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setProgressVal((p) => Math.min(100, p + 15))}
                      >
                        Increase Progress
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setProgressVal(20)}
                      >
                        Reset
                      </Button>
                    </div>

                    <Progress isIndeterminate label="Analyzing Leaf Texture (Indeterminate)" variant="ai" />
                  </div>

                  <Divider label="Spinners & Skeletons" />

                  <div className="flex items-center gap-6">
                    <Spinner size="sm" color="primary" />
                    <Spinner size="md" color="primary" />
                    <Spinner size="lg" color="accent" />
                    <Spinner size="xl" color="ai" />
                  </div>

                  <div className="space-y-2 max-w-md pt-2">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="80%" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabPanel>

          {/* TAB 5: States */}
          <TabPanel value="states">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <EmptyState
                title="No Crop Reports Yet"
                description="You have not submitted any crop disease or pest photos for analysis yet."
                primaryAction={{
                  label: 'Report a Crop Problem',
                  onClick: () => alert('Starting crop report workflow'),
                }}
              />

              <ErrorState
                title="Failed to Load Farm Records"
                message="We could not reach the agricultural server. Please ensure your connection is active."
                onRetry={() => alert('Retrying fetch...')}
              />

              <SuccessState
                title="Crop Advisory Submitted"
                message="Your diagnosis has been recorded and an SMS summary has been dispatched."
                primaryAction={{
                  label: 'View Case Record',
                  onClick: () => alert('Navigating to case record'),
                }}
              />
            </div>
          </TabPanel>

          {/* TAB 6: Navigation */}
          <TabPanel value="navigation">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Crop Photo Upload Foundation</CardTitle>
                  <CardDescription>
                    Drag-and-drop desktop zone, mobile camera trigger, and file validation
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-w-xl">
                  <FileUpload
                    label="Upload Infected Plant Photograph"
                    helperText="Supports JPG, PNG, WEBP files up to 10MB"
                    onFileSelect={(file) => {
                      if (file) {
                        alert(`Selected file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
                      }
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Breadcrumbs &amp; Pagination</CardTitle>
                  <CardDescription>Accessible wayfinding and multi-page records traversal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Subheading className="text-sm text-text-muted mb-2">Hierarchical Breadcrumbs</Subheading>
                    <Breadcrumbs items={breadcrumbItems} />
                  </div>

                  <Divider />

                  <div>
                    <Subheading className="text-sm text-text-muted mb-3 text-center">
                      Accessible Pagination (Current Page: {currentPage} of 10)
                    </Subheading>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={10}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Avatars</CardTitle>
                  <CardDescription>Profile avatars with image, initials, and icon fallbacks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Avatar name="Ramesh Patel" size="sm" />
                    <Avatar name="Dr. Anita Sharma" size="md" />
                    <Avatar name="Sanjay Kumar" size="lg" />
                    <Avatar size="xl" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabPanel>

          {/* TAB 7: Typography & Tokens */}
          <TabPanel value="typography">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Typography System (Times New Roman)</CardTitle>
                  <CardDescription>Strict typographic scale tailored for farmer smartphones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Caption>Display Heading</Caption>
                    <Display>Agri Rakshak AI Defense</Display>
                  </div>
                  <div>
                    <Caption>Page Title (H1)</Caption>
                    <PageTitle>Wheat Rust &amp; Leaf Blight Detection</PageTitle>
                  </div>
                  <div>
                    <Caption>Section Heading (H2)</Caption>
                    <SectionHeading>Agricultural Diagnostic Protocols</SectionHeading>
                  </div>
                  <div>
                    <Caption>Subheading (H3)</Caption>
                    <Subheading>Recommended Organic Spray Interventions</Subheading>
                  </div>
                  <div>
                    <Caption>Body Text</Caption>
                    <BodyText>
                      Early diagnosis of Puccinia graminis fungal spore reproduction enables farmers to preserve yield.
                    </BodyText>
                  </div>
                  <div>
                    <Caption>Small Text</Caption>
                    <SmallText>Last verified by Agricultural Field Officer on 09 Oct 2026, 14:30 IST.</SmallText>
                  </div>
                  <div>
                    <Caption>Label &amp; Helper Text</Caption>
                    <Label required>Symptom Severity Score</Label>
                    <HelperText>Assessed on a 1–5 scale based on affected foliar surface area</HelperText>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Theme &amp; Semantic Color Swatches</CardTitle>
                  <CardDescription>Official SIH 2026 Agri Rakshak color specifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Subheading className="text-sm text-text-muted mb-3">Core Palette</Subheading>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                      {Object.entries(THEME_COLORS).map(([name, hex]) => (
                        <div
                          key={name}
                          className="p-3 rounded-card text-center border border-[#D5E3D2] shadow-sm"
                          style={{
                            backgroundColor: hex,
                            color: name === 'background' || name === 'cards' ? '#263238' : '#FFFFFF',
                          }}
                        >
                          <div className="font-bold text-xs capitalize">{name}</div>
                          <div className="text-[11px] opacity-90">{hex}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Subheading className="text-sm text-text-muted mb-3">Central Semantic States</Subheading>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {Object.entries(SEMANTIC_COLORS).map(([name, colorObj]) => (
                        <div
                          key={name}
                          className="p-3 rounded-card text-center border shadow-sm"
                          style={{
                            backgroundColor: colorObj.light,
                            borderColor: colorObj.border,
                            color: colorObj.dark,
                          }}
                        >
                          <div className="font-bold text-xs capitalize">{name}</div>
                          <div className="text-[11px] font-mono">{colorObj.main}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabPanel>
        </Tabs>
      </Container>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Crop Advisory Verification"
        description="Review expert diagnostic advisory before confirmation."
        footer={
          <Button variant="primary" onClick={() => setIsDialogOpen(false)}>
            Close Dialog
          </Button>
        }
      >
        <p className="font-serif text-sm text-text">
          Interactive modal dialog working properly within the Phase 3 routing system.
        </p>
      </Dialog>

      <MobileBottomNav items={mobileNavItems} />
    </div>
  );
};

export default ShowcasePage;
