from libc.stdlib cimport malloc, free

def is_clockwise(points): 
    """
    # from pymunk sourcecode
    Check if the points given forms a clockwise polygon
    
    :return: True if the points forms a clockwise polygon
    """
    cdef int a = 0, i = 0, j = 0
    cdef int l_points = len(points)
    for i in range(l_points):
        j = i + 1
        if j == l_points:
            j = 0
        a += points[i][0] * points[j][1] - points[i][1] * points[j][0]
    return a <= 0 #or is it the other way around?

def calc_area(points):
    """Calculate the area of a polygon
    
    :return: Area of polygon
    """
    
    #ref: http://en.wikipedia.org/wiki/Polygon
    
    if len(points) < 3: return 0

    p1 = points[0]
    a = 0
    for p2 in points[1:] + [points[0]]:       
        a += p1[0] * p2[1] - p2[0] * p1[1]
        p1 = p2
    a = 0.5 * a
    
    return a

def calc_center(points):
    """
    # from pymunk sourcecode
    Calculate the center of a polygon
    
    :return: The center (x,y)
    """
    
    #ref: http://en.wikipedia.org/wiki/Polygon
    
    assert len(points) > 0, "need at least 1 points to calculate the center"
    
    area = calc_area(points)
    
    p1 = points[0]
    cx = cy = 0
    for p2 in points[1:] + [points[0]]:       
        tmp = (p1[0] * p2[1] - p2[0] * p1[1])
        cx += (p1[0] + p2[0]) * tmp
        cy += (p1[1] + p2[1]) * tmp
        p1 = p2
    c = 1 / (6. * area) * cx, 1 / (6. * area) * cy
    return c

cdef class Shape:
    '''
    Base class for all the shapes.

    You usually dont want to create instances of this class directly but use one
    of the specialized shapes instead.
    '''

    def __init__(self):
        self._shape = NULL
        self.automanaged = 1

    def __dealloc__(self):
        if self.automanaged:
            cpShapeFree(self._shape)

    property sensor:
        '''
        A boolean value if this shape is a sensor or not. Sensors only call
        collision callbacks, and never generate real collisions.
        '''
        def __get__(self):
            return self._shape.sensor
        def __set__(self, is_sensor):
            self._shape.sensor = is_sensor

    property collision_type:
        '''
        User defined collision type for the shape. See add_collisionpair_func
        function for more information on when to use this property
        '''
        def __get__(self):
            return self._shape.collision_type
        def __set__(self, t):
            self._shape.collision_type = t

    property group:
        '''
        Shapes in the same non-zero group do not generate collisions. Useful
        when creating an object out of many shapes that you don't want to self
        collide. Defaults to 0
        '''
        def __get__(self):
            return self._shape.group
        def __set__(self, group):
            self._shape.group = group

    property layers:
        '''
        Shapes only collide if they are in the same bit-planes.
        i.e. (a.layers & b.layers) != 0.
        By default, a shape occupies all 32 bit-planes, i.e. layers == -1
        '''
        def __get__(self):
            return self._shape.layers
        def __set__(self, layers):
            self._shape.layers = layers % 4294967296

    property elasticity:
        '''
        Elasticity of the shape. A value of 0.0 gives no bounce, while a value
        of 1.0 will give a 'perfect' bounce. However due to inaccuracies in the
        simulation using 1.0 or greater is not recommended.
        '''
        def __get__(self):
            return self._shape.e
        def __set__(self, e):
            self._shape.e = e

    property friction:
        '''
        Friction coefficient. pymunk uses the Coulomb friction model, a value of
        0.0 is frictionless.

        A value over 1.0 is perfectly fine.
        Some real world example values from Wikipedia (Remember that
        it is what looks good that is important, not the exact value).
        ==============  ======  ========
        Material        Other   Friction
        ==============  ======  ========
        Aluminium       Steel   0.61
        Copper          Steel   0.53
        Brass           Steel   0.51
        Cast iron       Copper  1.05
        Cast iron       Zinc    0.85
        Concrete (wet)  Rubber  0.30
        Concrete (dry)  Rubber  1.0
        Concrete        Wood    0.62
        Copper          Glass   0.68
        Glass           Glass   0.94
        Metal           Wood    0.5
        Polyethene      Steel   0.2
        Steel           Steel   0.80
        Steel           Teflon  0.04
        Teflon (PTFE)   Teflon  0.04
        Wood            Wood    0.4
        ==============  ======  ========
        '''
        def __get__(self):
            return self._shape.u
        def __set__(self, u):
            self._shape.u = u

    property surface_velocity:
        '''
        The surface velocity of the object. Useful for creating conveyor belts
        or players that move around. This value is only used when calculating
        friction, not resolving the collision.
        '''
        def __get__(self):
            return (self._shape.surface_v.x, self._shape.surface_v.y)
        def __set__(self, surf):
            self._shape.surface_v = cpv(surf[0], surf[1])

    property body:
        '''
        The body this shape is attached to
        '''
        def __get__(self):
            return self._body

    property _hashid_private:
        def __get__(self):
            return self._shape.hashid_private

    def cache_bb(self):
        '''
        Update and returns the bouding box of this shape
        '''
        return cpShapeCacheBB(self._shape)

    def point_query(self, p):
        '''
        Check if the given point lies within the shape
        '''
        return cpShapePointQuery(self._shape, cpv(p.x, p.y))

    def segment_query(self, start, end):
        '''
        Check if the line segment from start to end intersects the shape.
        '''
        cdef cpSegmentQueryInfo* info
        if cpShapeSegmentQuery(self._shape, cpv(start.x, start.y), cpv(end.x, end.y), info):
            return SegmentQueryInfo(self, start, end, info.t, info.n)
        return None


cdef class Circle(Shape):
    '''
    A circle shape defined by a radius

    This is the fastest and simplest collision shape
    '''

    def __init__(self, Body body, cpFloat radius, offset=(0, 0)):
        Shape.__init__(self)
        self._body = body
        self.radius = radius
        self.offset = cpv(offset[0], offset[1])
        self._shape = cpCircleShapeNew(body._body, radius, cpv(offset[0], offset[1]))
        #self._cs = ct.cast(self._shape, ct.POINTER(cp.cpCircleShape))

    def unsafe_set_radius(self, r):
        '''
        Unsafe set the radius of the circle.
        '''
        cpCircleShapeSetRadius(self._shape, r)

    def unsafe_set_offset(self, o):
        '''
        Unsafe set the offset of the circle.
        '''
        cpCircleShapeSetOffset(self._shape, cpv(o.x, o.y))

    property offset:
        def __get__(self):
            return Vec2d(self.offset.x, self.offset.y)

    property radius:
        def __get__(self):
            return self.radius
        def __set__(self, radius):
            self.radius = radius

    def _get_radius(self):
        return self.radius
    #radius = property(_get_radius)

    #def _get_offset (self):
    #    return cp.cpCircleShapeGetOffset(self._shape)
    #offset = property(_get_offset)


cdef class Segment(Shape):
    '''
    A line segment shape between two points

    This shape can be attached to moving bodies, but don't currently generate
    collisions with other line segments. Can be beveled in order to give it a
    thickness.
    '''

    

    def __init__(self, Body body, a, b, cpFloat radius):
        Shape.__init__(self)
        self._body = body
        self._shape = cpSegmentShapeNew(body._body, cpv(a[0], a[1]), cpv(b[0], b[1]), radius)
        self._segment_shape = <cpSegmentShape *>self._shape

    property a:
        '''
        The first of the two endpoints for this segment
        '''
        def __get__(self):
            return Vec2d(self._segment_shape.a.x, self._segment_shape.a.y)
        def __set__(self, a):
            self._segment_shape.a = cpv(a[0], a[1])

    property b:
        '''
        The second of the two endpoints for this segment
        '''
        def __get__(self):
            return Vec2d(self._segment_shape.b.x, self._segment_shape.b.y)
        def __set__(self, a):
            self._segment_shape.b = cpv(a[0], a[1])

    property radius:
        # TODO
        '''
        The thickness of the segment
        '''
        def __get__(self):
            return self._segment_shape.r
        def __set__(self, r):
            self._segment_shape.r = r

# FIXME: This class is absent in Pymunk API,
#        so it should be marked as depricated
#        and ridded then. Poly.create_box
#        should be used instead 
#   This class is documented in the chipmunk2d api. I am 
#   more interested in producing a wrapper of chipmunk2d than 
#   compatibility with pymunk. -Kovak

cdef class BoxShape(Poly):

    def __init__(self, Body body, width, height, offset=(0,0)):
        cdef float x = width  * 0.5
        cdef float y = height * 0.5
        Poly.__init__(self, body, ((-x, -y), (-x, y), (x, y), (x, -y)), offset)
        self.width = width
        self.height = height

    property width:

        def __get__(self):
            return self.width
        def __set__(self, width):
            self.width = width

    property height:
        def __get__(self):
            return self.height
        def __set__(self, height):
            self.height = height


cdef class Poly(Shape):


    def __init__(self, Body body, vertices, offset=(0, 0), auto_order_vertices=True):
        Shape.__init__(self)
        self._vertices = NULL
        self._body = body
        self._offset = cpv(offset[0], offset[1])

        if not len(vertices):
            raise Exception('No vertices passed')

        #original: if auto_order_vertices and not u.is_clockwise(vertices):
        self._vertices_count = len(vertices)
        if auto_order_vertices and not is_clockwise(vertices):
            i_vs = zip(range(len(vertices)-1, -1, -1), vertices)
        else:
            i_vs = zip(range(len(vertices)), vertices)

        self._vertices = <cpVect *>malloc(sizeof(cpVect) * self._vertices_count)
        for i, vertex in i_vs:
            self._vertices[i] = cpv(vertex[0], vertex[1])

        self._shape = cpPolyShapeNew(body._body, len(vertices), self._vertices,
                self._offset)

    def __dealloc__(self):
        if self._vertices != NULL:
            free(self._vertices)

    #@staticmethod
    #def create_box(body, size=(10,10)):
    #    x,y = size[0]*.5,size[1]*.5
    #    vs = [(-x,-y),(-x,y),(x,y),(x,-y)]
    #    return Poly(body,vs)

    #def get_points(self):
    #    points = []
    #    rv = self._body.rotation_vector
    #    bp = self._body.position
    #    vs = self.verts
    #    o = self.offset
    #    for i in range(len(vs)):
    #        p = (vs[i]+o).cpvrotate(rv)+bp
    #        points.append(Vec2d(p))
    #    return points

    @staticmethod
    def create_box(body, size=(10, 10), offset=(0, 0)):
        x, y = size[0] * .5, size[1] * .5
        vs = [(-x, -y), (-x, y), (x, y), (x, -y)]
        return Poly(body, vs, offset)

    property offset:
        def __get__(self):
            return Vec2d(self._offset.x, self._offset.y)

    def get_vertices(self): 
        """Get the vertices in world coordinates for the polygon
        
        :return: [`Vec2d`] in world coords
        """
        cdef int i
        cdef list points = []
        cdef object points_a = points.append
        cdef Body body = self._body
        cdef cpBody* ibody = body._body
        cdef cpVect rv = ibody.rot
        cdef cpVect bp = ibody.p
        cdef cpVect o = self._offset
        cdef cpVect * vertices = self._vertices
        cdef cpVect vert
        cdef cpVect p
        for i in range(self._vertices_count):
            vert = vertices[i]
            p = cpvadd(cpvrotate((cpvadd(vert, o)), rv), bp)
            points_a(Vec2d(p.x, p.y))
            
        return points

    def get_local_vertices(self): 
        """Get the vertices in local coordinates for the polygon
        
        :return: [`Vec2d`] in local coords
        """
        cdef int i
        cdef list points = []
        cdef object points_a = points.append
        cdef cpVect * vertices = self._vertices
        cdef cpVect vert
        for i in range(self._vertices_count):
            vert = vertices[i]
            points_a(Vec2d(vert.x, vert.y))
            
        return points


cdef class SegmentQueryInfo:
    def __cinit__(self, shape, start, end, t, n):
        self._shape = shape
        self._t = t
        self._n = n
        self._start = start
        self._end = end

    def __repr__(self):
        return 'SegmentQueryInfo(%r, %r, %r, %r, %r)' % (
            self.shape, self._start, self._end, self.t, self.n)

    property shape:
        def __get__(self):
            return self._shape

    property t:
        def __get__(self):
            return self._t

    property n:
        def __get__(self):
            return self._n

    #def get_hit_point(self):
    #    return Vec2d(self._start).interpolate_to(self._end, self.t)

    #def get_hit_distance(self):
    #    return Vec2d(self._start).get_distance(self._end) * self.t
